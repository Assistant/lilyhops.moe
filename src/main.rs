use chrono::SecondsFormat::Secs;
use chrono::{DateTime, Utc};
use humantime::parse_duration;
use rocket::http::Status;
use rocket::request::FromParam;
use rocket::{get, launch, routes};
use rocket_dyn_templates::{context, Template};
use serde::{Deserialize, Deserializer, Serialize};
use std::env;
use std::ffi::OsStr;
use std::fs::{read_dir, read_to_string, DirEntry};
use std::path::{Path, PathBuf};
use std::sync::LazyLock;
use std::time::{Duration, UNIX_EPOCH};
use tracing_subscriber::EnvFilter;

static VODS: LazyLock<String> = LazyLock::new(|| env::var("VODS").unwrap_or("vods".into()));
static HIGHLIGHTS: LazyLock<String> =
    LazyLock::new(|| env::var("HIGHLIGHTS").unwrap_or("highlights".into()));
static CLIPS: LazyLock<String> = LazyLock::new(|| env::var("CLIPS").unwrap_or("clips".into()));

#[launch]
fn rocket() -> _ {
    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    rocket::build()
        .mount("/", routes![index, lists, iframes, viewer])
        .attach(Template::fairing())
}

#[derive(Debug, Clone, Copy)]
enum Kind {
    Vods,
    Highlights,
    Clips,
}

impl Kind {
    fn path(&self) -> &String {
        match self {
            Kind::Vods => &VODS,
            Kind::Highlights => &HIGHLIGHTS,
            Kind::Clips => &CLIPS,
        }
    }
    fn name(&self) -> &str {
        match self {
            Kind::Vods => "vods",
            Kind::Highlights => "highlights",
            Kind::Clips => "clips",
        }
    }
}

impl<'r> FromParam<'r> for Kind {
    type Error = &'r str;

    fn from_param(param: &'r str) -> Result<Self, Self::Error> {
        match param.to_lowercase().as_str() {
            "vods" => Ok(Self::Vods),
            "highlights" => Ok(Self::Highlights),
            "clips" => Ok(Self::Clips),
            _ => Err("Invalid option"),
        }
    }
}

#[get("/")]
fn index() -> Template {
    Template::render("index", context! {})
}

#[get("/<kind>")]
fn lists(kind: Kind) -> Template {
    let (timestamp, items) = get_items(kind.path(), None);
    let count = items.len();
    let kind = kind.name();

    Template::render("list", context! { timestamp, count, kind })
}

#[get("/<kind>/lists/<cursor>")]
fn iframes(kind: Kind, cursor: &str) -> Result<Template, Status> {
    let (t, p) = cursor.split_once('-').ok_or(Status::BadRequest)?;
    let timestamp = t.parse().map_err(|_| Status::BadRequest)?;
    let page: usize = p.parse().map_err(|_| Status::BadRequest)?;

    let (_, items) = get_items(kind.path(), Some(timestamp));
    let kind = kind.name();
    let entries: Vec<DisplayEntry> = items
        .into_iter()
        .skip(page * 60)
        .take(60)
        .map(DisplayEntry::from)
        .collect();

    Ok(Template::render("iframe", context! { entries, kind }))
}

#[get("/<kind>/<id>")]
fn viewer(kind: Kind, id: &str) -> Result<Template, Status> {
    match get_all_items(kind.path()).find(|(e, _)| e.id == id) {
        Some((entry, _)) => Ok(Template::render(
            "viewer",
            context! { entry, kind: kind.name() },
        )),
        None => Err(Status::NotFound),
    }
}

fn get_items(path: impl AsRef<Path>, cutoff: Option<u64>) -> (u64, Vec<Entry>) {
    let items = get_all_items(path).filter(|(_, t)| cutoff.is_none_or(|c| t <= &c));

    let (items, latest): (Vec<_>, Vec<_>) = items.unzip();
    let latest = latest.into_iter().max().unwrap_or(0);

    (latest, items)
}

fn get_all_items(path: impl AsRef<Path>) -> impl Iterator<Item = (Entry, u64)> {
    let mut items: Vec<_> = read_dir(path)
        .unwrap()
        .flatten()
        .filter_map(file_tuple)
        .filter(|(p, _)| p.is_file() && is_json(p))
        .filter_map(read_files)
        .filter(|(e, _)| !e.hidden.unwrap_or(false))
        .collect();
    items.sort_by_key(|(e, _)| e.created_at);
    items.into_iter().rev()
}

fn read_files((path, timestamp): (PathBuf, u64)) -> Option<(Entry, u64)> {
    Some((
        serde_json::from_str::<Entry>(&read_to_string(path).ok()?).ok()?,
        timestamp,
    ))
}

fn file_tuple(file: DirEntry) -> Option<(PathBuf, u64)> {
    Some((
        file.path(),
        file.metadata()
            .ok()?
            .created()
            .ok()?
            .duration_since(UNIX_EPOCH)
            .ok()?
            .as_secs(),
    ))
}

fn is_json(path: &Path) -> bool {
    path.extension() == Some(OsStr::new("json"))
        && path
            .file_stem()
            .and_then(OsStr::to_str)
            .is_some_and(|s| !s.contains('.'))
}

#[derive(Clone, Debug, Serialize, Deserialize)]
struct Entry {
    id: String,
    title: String,
    #[serde(default)]
    description: String,
    created_at: DateTime<Utc>,
    #[serde(deserialize_with = "parse_duration_flex")]
    duration: Duration,
    hidden: Option<bool>,
}

#[derive(Debug, Serialize)]
struct DisplayEntry {
    id: String,
    title: String,
    description: String,
    created_at: String,
    created_at_long: String,
    duration: String,
}

impl From<Entry> for DisplayEntry {
    fn from(value: Entry) -> Self {
        Self {
            id: value.id,
            title: value.title,
            description: value.description,
            created_at: value.created_at.format("%Y-%m-%d").to_string(),
            created_at_long: value.created_at.to_rfc3339_opts(Secs, true),
            duration: format_duration(value.duration),
        }
    }
}

fn parse_duration_flex<'de, D>(deserializer: D) -> Result<Duration, D::Error>
where
    D: Deserializer<'de>,
{
    #[derive(Deserialize)]
    #[serde(untagged)]
    enum Either {
        Float(f64),
        String(String),
    }

    match Either::deserialize(deserializer)? {
        Either::Float(secs) => Ok(Duration::from_secs_f64(secs)),
        Either::String(s) => {
            parse_duration(&s).map_err(|_| serde::de::Error::custom("invalid duration string"))
        }
    }
}

fn format_duration(duration: Duration) -> String {
    let seconds = duration.as_secs();
    if seconds > 60 {
        let h = seconds / 3600;
        let m = (seconds % 3600) / 60;
        let s = seconds % 60;
        format!("{h:02}:{m:02}:{s:02}")
    } else {
        format!("{seconds:02}")
    }
}

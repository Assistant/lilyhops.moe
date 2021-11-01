import path from 'path'
import fs, { readdirSync, readFileSync } from 'fs'
import type { VideoType, SelectorType, ResponseType, GetVideoProps } from 'graphql/schema'
import type { VodData, ClipData } from 'types/natives'

const getVideo = (props: GetVideoProps, selector: SelectorType) => {
  const videoFiles: string[] = readdirSync(path.resolve(`./public/${props.root}`)).filter((value: string) => /.*\.mp4$/.test(value))
  let response: ResponseType = { videos: [] }
  let min: number = 0
  let max: number = -1
  let videoData: VideoType[] = videoFiles.map((value: string) => {
    const _id: RegExpMatchArray | null = value.match(props.regex)
    if (_id === null) return
    if (_id.length === 0) return
    const id: string = _id[1]
    try {
      const data: VodData | ClipData = JSON.parse(readFileSync(path.resolve(`./public/${props.root}`, `${id}.json`)).toString())
      const video: VideoType = {
        id: id,
        title: data.title,
        duration: `${data.duration}`,
        type: props.type,
        created: `${data.created_at}`,
        videoUrl: `/${props.root}/${value}`,
        subtitleUrl: getSubtitle(id, props.type, props.root),
        thumbnailUrl: `/${props.root}/${id}.jpg`,
      }
      return video
    } catch (err) {
      console.error(err)
      return
    }
  }).filter((value): value is VideoType => !!value)
  videoData.sort(dateSort)

  if (selectorUsed(selector, 'id')) {
    min = videoData.findIndex((element) => element.id === selector.id )
  }
  if (selectorUsed(selector, 'limit') && !!selector.limit) {
    max = min + selector.limit
  }

  if (max >= 0 && max < videoData.length) {
    response.nextId = videoData[max].id
    response.videos = videoData.slice(min, max)
  } else {
    response.videos = videoData.slice(min)
  }

  if (selectorUsed(selector, 'start') && !!selector.start) {
    response.insert = videoData.slice(0, videoData.findIndex((element) => element.id === selector.start ))
  }
  return response
}

const getSubtitle = (id: string, type: string, root: string) => {
  const filename: string = `/${root}/${id}.${type === 'clip' ? 'chat.json' : 'ssa.br'}`
  if (fs.existsSync(`./public${filename}`)) return filename 
  else return
}

const selectorUsed = (selector: SelectorType, field: string) => {
  return (selector !== undefined && field in selector)
}

const dateSort = (first: VideoType, second: VideoType): number => {
  return Date.parse(second.created) - Date.parse(first.created)
}

const vodsProps: GetVideoProps = {root: 'lily', regex: /v(\d+).mp4$/, type: 'vod'}
const highlightsProps: GetVideoProps = {root: 'lily/highlights', regex: /v(\d+).mp4$/, type: 'highlight'}
const clipsProps: GetVideoProps = {root: 'lily/clips', regex: /^(.*)\.mp4$/, type: 'clip'}

export default getVideo
export { getSubtitle, selectorUsed, dateSort }
export { vodsProps, highlightsProps, clipsProps }
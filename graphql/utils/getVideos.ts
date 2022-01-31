import path from 'path'
import fs, { readdirSync, readFileSync } from 'fs'
import type { VideoType, SelectorType, TypeType } from 'graphql/schema'
import { getRoot, getRegex } from 'graphql/utils/VideoProps'
import type { VodData, ClipData } from 'types/natives'

const getVideos = (type: TypeType, selector: SelectorType) => {
  const root: string = getRoot(type)
  const regex: RegExp = getRegex(type)
  const videoFiles: string[] = readdirSync(path.resolve(`./public/${root}`)).filter((value: string) => /.*\.mp4$/.test(value))
  const videoData: VideoType[] = videoFiles.map((value: string) => {
    const _id: RegExpMatchArray | null = value.match(regex)
    if (_id === null) return
    if (_id.length === 0) return
    const id: string = _id[1]
    try {
      const data: VodData | ClipData = JSON.parse(readFileSync(path.resolve(`./public/${root}`, `${id}.json`)).toString())
      if (data.hasOwnProperty('hidden')) return
      const video: VideoType = {
        id: id,
        title: data.title,
        duration: `${data.duration}`,
        type: type,
        created: `${data.created_at}`,
        videoUrl: `/${root}/${value}`,
        subtitleUrl: getSubtitle(id, type, root),
        thumbnailUrl: `/${root}/${id}.jpg`,
      }
      return video
    } catch (err) {
      console.error(err)
      return
    }
  }).filter((value): value is VideoType => !!value).sort(dateSort)

  const min: number = selectorUsed(selector, 'id') ? videoData.findIndex((element) => element.id === selector.id ) : 0
  const max: number = selectorUsed(selector, 'limit') && !!selector.limit ? min + selector.limit : -1

  const maxValid: boolean = max >= 0 && max < videoData.length
  const insertValid: boolean = selectorUsed(selector, 'start') && !!selector.start && selector.start !== videoData[0].id

  return {
    insert: insertValid ? videoData.slice(0, videoData.findIndex((element) => element.id === selector.start )) : undefined,
    videos: maxValid ? videoData.slice(min, max) : videoData.slice(min),
    nextId: maxValid ? videoData[max].id : undefined,
  }
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

export default getVideos
export { getSubtitle, selectorUsed, dateSort }

import path from 'path'
import fs, { readdirSync, readFileSync } from 'fs'
import type { VideoType, SelectorType, ResponseType, GetVideoProps, TypeType } from 'graphql/schema'
import { getRoot, getRegex } from 'graphql/utils/VideoProps'
import type { VodData, ClipData } from 'types/natives'

const getVideos = (type: TypeType, selector: SelectorType) => {
  const root: string = getRoot(type)
  const regex: RegExp = getRegex(type)
  const videoFiles: string[] = readdirSync(path.resolve(`./public/${root}`)).filter((value: string) => /.*\.mp4$/.test(value))
  let response: ResponseType = { videos: [] }
  let min: number = 0
  let max: number = -1
  let videoData: VideoType[] = videoFiles.map((value: string) => {
    const _id: RegExpMatchArray | null = value.match(regex)
    if (_id === null) return
    if (_id.length === 0) return
    const id: string = _id[1]
    try {
      const data: VodData | ClipData = JSON.parse(readFileSync(path.resolve(`./public/${root}`, `${id}.json`)).toString())
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
    response.nextId = ''
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

export default getVideos
export { getSubtitle, selectorUsed, dateSort }

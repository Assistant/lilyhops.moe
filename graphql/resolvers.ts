import fs from 'fs'
import { getVods } from '../components/utils/vods'
import { VideoData } from '../components/utils/types/video'

const getData = (root: string, regex: RegExp, type: 'vod' | 'highlight' | 'clip', id: string) => {
  const videoData = getVods({
    root: `./public/${root}`,
    regex: regex,
    type: type === 'clip' ? 'clip' : 'vod'
  }).map((value: VideoData) => {
    return {
      id: value.data.id,
      title: value.data.title,
      videoUrl: `/${root}/${value.srcName}`,
      duration: `${value.data.duration}`,
      type: type,
      subtitleUrl: `${getSubtitle(value.data.id, type, root)}`,
      thumbnailUrl: `/${root}/${value.data.id}.jpg`,
    }
  })
  if (id !== undefined && id.length !== 0) {
    const result = videoData.filter((value) => {
      return value.id === id
    })
    if (result.length === 1) {
      return result
    } else if(result.length >= 1) {
      return result
    }
  }
  return videoData
}

const vods = (_parent: any, args: { id: string }, _ctx: any, _info: any) => getData('lily', /v(\d+).mp4$/, 'vod', args.id)
const hightlights = (_parent: any, args: { id: string }, _ctx: any, _info: any) => getData('lily/highlights', /v(\d+).mp4$/, 'highlight', args.id)
const clips = (_parent: any, args: { id: string }, _ctx: any, _info: any) => getData('lily/clips', /^(.*)\.mp4$/, 'clip', args.id)

export const resolvers = {
  Query: {
    vods:  vods,
    highlights: hightlights,
    clips: clips,
  }
}

const getSubtitle = (id: string, type: string, root: string) => {
  const filename: string = `/${root}/${id}.${type === 'clip' ? 'chat.json' : 'ssa.br'}`
  if (fs.existsSync(`./public${filename}`)) return filename 
  else return ''
}

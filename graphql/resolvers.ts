import type { SelectorType, ResponseType } from 'graphql/schema'
import getVideos from 'graphql/utils/getVideos'

type Args = {
  selector: SelectorType
}

const vods = (_parent: any, args: Args, _ctx: any, _info: any): ResponseType => getVideos('vod', args.selector)
const hightlights = (_parent: any, args: Args, _ctx: any, _info: any): ResponseType => getVideos('highlight', args.selector)
const clips = (_parent: any, args: Args, _ctx: any, _info: any): ResponseType => getVideos('clip', args.selector)

export const resolvers = {
  Query: {
    vods: vods,
    highlights: hightlights,
    clips: clips,
  }
}
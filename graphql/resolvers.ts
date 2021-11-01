import type { SelectorType, ResponseType } from 'graphql/schema'
import getVideo, {vodsProps, highlightsProps, clipsProps } from 'graphql/utils'

type Args = {
  selector: SelectorType
}

const vods = (_parent: any, args: Args, _ctx: any, _info: any): ResponseType => getVideo(vodsProps, args.selector)
const hightlights = (_parent: any, args: Args, _ctx: any, _info: any): ResponseType => getVideo(highlightsProps, args.selector)
const clips = (_parent: any, args: Args, _ctx: any, _info: any): ResponseType => getVideo(clipsProps, args.selector)

export const resolvers = {
  Query: {
    vods: vods,
    highlights: hightlights,
    clips: clips,
  }
}
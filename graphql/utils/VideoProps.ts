import type { TypeType } from 'graphql/schema'
import { VOD_QUERY, HIGHLIGHT_QUERY, CLIP_QUERY } from 'graphql/utils/Video'
import { VODS_QUERY, HIGHLIGHTS_QUERY, CLIPS_QUERY } from 'graphql/utils/VideoList'

export type Destination = 'list' | 'video'

const getRoot = (type: TypeType): string => {
  switch (type) {
    case 'vod': return 'lily'
    case 'highlight': return 'lily/highlights'
    case 'clip': return 'lily/clips'
  }
}

const getRegex = (type: TypeType): RegExp => {
  switch (type) {
    case 'vod': return /v(\d+).mp4$/
    case 'highlight': return /v(\d+).mp4$/
    case 'clip': return /^(.*)\.mp4$/
  }
}

const getQuery = (type: TypeType, destination: Destination) => {
  switch (destination) {
    case 'list': {
      switch (type) {
        case 'vod': return VODS_QUERY
        case 'highlight': return HIGHLIGHTS_QUERY
        case 'clip': return CLIPS_QUERY
      }
    }
    case 'video': {
      switch (type) {
        case 'vod': return VOD_QUERY
        case 'highlight': return HIGHLIGHT_QUERY
        case 'clip': return CLIP_QUERY
      }
    }
  }
}

export { getRoot, getRegex, getQuery }
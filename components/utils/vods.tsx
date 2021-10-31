import { VodData } from './types/vods'
import { GetVodsProps, GetVodProps, VideoData} from './types/video'

import path from 'path'
import { readdirSync, readFileSync } from 'fs'
import { ClipData } from './types/clips'

export const getVods = (props: GetVodsProps): VideoData[] => {
  const vodPath: string = path.resolve(props.root)
  const mp4Files: string[] = readdirSync(vodPath).filter((value: string): boolean => /.*\.mp4$/.test(value))
  const _vodsData: (VideoData|undefined)[] = mp4Files.map((value: string) => {
    const _id: RegExpMatchArray | null = value.match(props.regex)
    if (_id === null) return
    if (_id.length === 0) return
    const id: string = _id[1]
    try {
      const data: Buffer = readFileSync(path.resolve(vodPath, `${id}.json`))
      if (props.type === 'vod') {
        const jsonData: VodData = JSON.parse(data.toString())
        return { type: 'vod', srcName: value, data: jsonData }
      } else {
        const jsonData: ClipData = JSON.parse(data.toString())
        return { type: 'clip', srcName: value, data: jsonData }
      }
    } catch (err) {
      console.error(err)
      return
    }
  })

  function notUndefined(value: VideoData | undefined): value is VideoData { return value !== undefined }
  let vodsData: VideoData[] = _vodsData.filter(notUndefined)
  /*
  const getClipId = (clip: ClipData): string => {
    const pattern1: RegExp = /.*\.twitch.tv\/AT-cm%7C([^-]+)-preview-\d+x\d+.jpg/
    const pattern2: RegExp = /.*\.twitch.tv\/vod-([^-]+)-offset-\d+-\d+x\d+.jpg/
    const pattern3: RegExp = /.*\.twitch.tv\/(\d+)-offset-\d+-\d+x\d+.jpg/

    if (clip.video_id !== undefined && clip.video_id.length > 0) {
      return clip.video_id
    }
    if (pattern1.test(clip.thumbnail_url)) {
      const match = clip.thumbnail_url.match(pattern1)
      if (match !== null && match.length > 1) return match[1]
    }
    if (pattern2.test(clip.thumbnail_url)) {
      const match = clip.thumbnail_url.match(pattern2)
      if (match !== null && match.length > 1) return match[1]
    }
    if (pattern3.test(clip.thumbnail_url)) {
      const idParser: Function = (value: string): string => {
        return ''
      }
      const match = clip.thumbnail_url.match(pattern3)
      if (match !== null && match.length > 1) return idParser(match[1])
    }
    return ''
  } */
  const vodSort = (first: VideoData, second: VideoData): number => {return parseInt(second.data.id, 10) - parseInt(first.data.id, 10)}
  const clipSort = (first: VideoData, second: VideoData): number => {
    if (first.type === 'vod') return 0
    if (second.type === 'vod') return 0
    return Date.parse(second.data.created_at) - Date.parse(first.data.created_at)
  }

  vodsData.sort(props.type === 'vod' ? vodSort : clipSort)
  return vodsData
}

export const getVod = (props: GetVodProps): VideoData|undefined => {
  const vodsData: VideoData[] = getVods(props.getVodsProps)
  const vodData: VideoData|undefined = vodsData.find((value: VideoData) => {
    return value.data.id === props.id
  })
  return vodData
}

export const pealVods = (array: VideoData[]): VodData[] => {
  return array.map((value: VideoData) => { if (value.type === 'vod') return value.data }).filter((value: VodData|undefined): value is VodData => { return value !== undefined })
}

export const pealClips = (array: VideoData[]): ClipData[] => {
  return array.map((value: VideoData) => { if (value.type === 'clip') return value.data }).filter((value: ClipData|undefined): value is ClipData => { return value !== undefined })
}

export const peal = (type: 'vod'|'clip'): (array: VideoData[]) => any => {
  if (type === 'vod') return pealVods
  return pealClips
}
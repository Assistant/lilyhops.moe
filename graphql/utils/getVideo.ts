import { VideoType, ResponseType, TypeType } from "graphql/schema"
import getVideos from "./getVideos"
import type { ResponseVideoType, VideoData } from './Video'

const simplify = (video: VideoType): VideoData => { return { id: video.id, title: video.title, videoUrl: video.videoUrl, thumbnailUrl: video.thumbnailUrl, subtitleUrl: video.subtitleUrl ?? '' }}
const simplifyVideoData = (response: ResponseType): ResponseVideoType => {
  return {
    videos: response.videos.map(simplify),
  }
}

const getVideo = (type: TypeType, id: string): ResponseVideoType => {
  return simplifyVideoData(getVideos(type, { limit: 1, id: id }))
}

export default getVideo
export { simplifyVideoData }
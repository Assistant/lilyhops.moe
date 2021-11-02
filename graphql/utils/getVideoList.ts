import { VideoType, ResponseType, TypeType } from "graphql/schema"
import getVideos from "./getVideos"
import { pageCount, ResponseListType } from "./VideoList"

const simplify = (video: VideoType) => { return { id: video.id, title: video.title, duration: video.duration }}
const simplifyVideoData = (response: ResponseType): ResponseListType => {
  return {
    insert: response.insert?.map(simplify),
    videos: response.videos.map(simplify),
    nextId: response.nextId,
  }
}

const getVideoList = (type: TypeType) => {
  return simplifyVideoData(getVideos(type, { limit: pageCount }))
} 

export default getVideoList
export { simplifyVideoData }
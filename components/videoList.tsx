import { inifiniLoader } from 'components/utils/loader'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Thumbnail, { ThumbnailProps } from 'components/video/thumbnail'
import fetchVideoList from 'graphql/utils/fetchVideoList'
import { ResponseListType, VideoListData } from 'graphql/utils/VideoList'

export type VideoListProps = {
  videos: VideoListData[],
  next: string,
  query: string,
  root: string,
  type: 'vod' | 'highlight' | 'clip',
  pageCount: number,
  error?: number,
}

export default function VideoList(props: VideoListProps) {
  const [videos, setVideos] = useState(props.videos)
  const [start, setStart] = useState(props.videos[0].id)
  const [next, setNext] = useState(props.next)
  const [hasMore, setHasMore] = useState(true)

  if (next.length <= 0) setHasMore(false)
  function isVideoListDataArr(object: VideoListData[] | undefined): object is VideoListData[] {
    return (object !== null && object !== undefined && object.length > 0)
  }

  const getMoreVideos = async () => {
    const response: ResponseListType = await fetchVideoList(props.query, {limit: props.pageCount, id: next, start: start})
    if (response.nextId === null || response.nextId === undefined) {
      setHasMore(false)
    } else {
      setNext(response.nextId)
    }
    if (isVideoListDataArr(response.insert)) {
      const newVideos: VideoListData[] = response.insert
      setStart(newVideos[0].id)
      setVideos((current: VideoListData[]) => [...newVideos, ...current])
    }
    if (response.videos.length === 0) return
    setVideos((current: VideoListData[]) => [...current, ...response.videos])
  }  

  return (
    <InfiniteScroll
      className="gap-x-4 mb-4 mx-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      dataLength={videos.length}
      next={getMoreVideos}
      hasMore={hasMore}
      loader={inifiniLoader}
    >
      {
        videos.map((video: VideoListData) => { 
          const thumbProps: ThumbnailProps = {
            id: video.id,
            link: `/${props.type}s/${video.id}`,
            title: video.title,
            duration: video.duration,
            created: video.created,
            image: `/${props.root}/${video.id}.jpg`,
          }
          return <Thumbnail key={video.id} {...thumbProps}/>
        })
      }
    </InfiniteScroll>
  )
}
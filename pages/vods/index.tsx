import { GetServerSideProps , GetServerSidePropsContext } from 'next'
import getVideoList from 'graphql/utils/getVideoList'
import { pageCount, ResponseListType } from 'graphql/utils/VideoList'
import VideoList, { VideoListProps } from 'components/videoList'
import type { TypeType } from 'graphql/schema'
import { getRoot, getQuery } from 'graphql/utils/VideoProps'

const type: TypeType = 'vod'

export default function Vods(props: VideoListProps) {
  return (
    <VideoList {...props} />
  )
}

export const getServerSideProps: GetServerSideProps  = async (context: GetServerSidePropsContext) => {
  const response: ResponseListType = getVideoList(type)
  return {
    props: {
      videos: response.videos,
      next: response.nextId,
      query: getQuery(type, 'list'),
      root: getRoot(type),
      type: type,
      pageCount: pageCount,
    }
  }
}
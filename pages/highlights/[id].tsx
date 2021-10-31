import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next'
import { VideoData } from '../../components/utils/types/video'
import { getVod } from '../../components/utils/vods'
import Video, { VideoProps, errorProps, getVodProps, getVodArgs, getPaths } from '../../components/video/video'
const type = 'highlights'

export default function Vod(props: VideoProps) {
  return (
    <Video {...props} />
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const _id = context.params?.id 
  let id: string
  if (typeof _id == 'string') {
    id = _id
  } else {
    return errorProps(500, type)
  }

  const videoData: VideoData|undefined = getVod(getVodArgs('./public/lily/highlights', /v(\d+)\.mp4$/, type, id))
  if (videoData === undefined) return errorProps(404, type)
  return getVodProps(videoData, id, type)
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getPaths()
}
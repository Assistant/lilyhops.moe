import getVideo from 'graphql/utils/getVideo'
import { ResponseVideoType } from 'graphql/utils/Video'
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next'
import Video, { VideoProps, errorProps, getPaths } from 'components/video/video'
import { TypeType } from 'graphql/schema'
const type: TypeType = 'highlight'

export default function Highlight(props: VideoProps) {
  return (
    <Video {...props} />
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id
  if (typeof id !== 'string') return errorProps(500, type)

  const response: ResponseVideoType = getVideo(type, id)
  if (response.videos[0] === undefined) return errorProps(404, type)
  return { 
    props: { id: id, video: response.videos[0], type: type }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return getPaths()
}
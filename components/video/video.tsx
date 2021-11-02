import { NextRouter, useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { Loader } from 'components/utils/loader'
import { ErrorPage } from 'components/utils/error'
import { VideoJsPlayer } from 'video.js';
import VREPlayer from 'videojs-react-enhanced';
import SubtitlesOctopus from 'public/lily/js/subtitles-octopus'
import { libassOptions } from 'types/libass-wasm'
import { VideoData } from 'graphql/utils/Video'
import { TypeType } from 'graphql/schema';

export const getPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const errorProps = (code: number, type: TypeType): { props: VideoProps } => {
  return {
     props: {
      id: '',
      video: {
        id: '',
        title: '',
        videoUrl: '',
        subtitleUrl: '',
        thumbnailUrl: '',
      },
      type: type,
      error: code,
    }
  }
}

export type VideoProps = {
  id: string,
  video: VideoData,
  type: 'vod'|'highlight'|'clip'
  error?: number,
}

const playerOptions: VREPlayer.IPlayerOptions = {
  controls: true,
}
const videojsOptions: VREPlayer.IVideoJsOptions = {
  fluid: false,
  aspectRatio: '16:9',
}
const hideList: string[] = [
  'pictureInPictureToggle',
  'playbackRateMenuButton',
]
export const vsjOptions = {
  playerOptions,
  videojsOptions,
  hideList,
} 

export default function Video(props: VideoProps) {
  const router: NextRouter = useRouter()
  if(router.isFallback) {
    return <Loader />
  }
  
  const { video, error } = props
  if(error){
    return (
      <ErrorPage>
        <DefaultErrorPage statusCode={error}/>
      </ErrorPage>
    )
  }

  const src: string = video.videoUrl
  const poster: string = video.thumbnailUrl
  const subUrl: string = video.subtitleUrl

  const resources: VREPlayer.IResources = {
    sources: [
      {
        src,
        type: 'video/mp4'
      },
    ],
    poster,
  }

  return (
    <>
      <VREPlayer 
        playerOptions={vsjOptions.playerOptions}
        videojsOptions={vsjOptions.videojsOptions}
        resources={resources}
        hideList={vsjOptions.hideList}
        onReady={(player: VideoJsPlayer) => {

          const subtitleOptions: libassOptions = {
            video: player.contentEl().getElementsByTagName('video')[0],
            subUrl,
            workerUrl: '/lily/js/subtitles-octopus-worker.js',
            legacyWorkerUrl: '/lily/js/subtitles-octopus-worker-legacy.js',
            timeOffset: -6,
          }
          const octopus = new SubtitlesOctopus(subtitleOptions)
          return octopus
        }}
      />
      <h1 className='font-title font-bold overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-800 m-0 p-4 text-6xl' title={video.title}>{video.title}</h1>
    </>
  )
}
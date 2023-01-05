import { NextRouter, useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { Loader } from 'components/utils/loader'
import { ErrorPage } from 'components/utils/error'
import { VideoJsPlayer } from 'video.js'
import 'videojs-hotkeys'
import VREPlayer from 'videojs-react-enhanced'
import SubtitlesOctopus from 'public/lily/js/subtitles-octopus'
import { libassOptions } from 'types/libass-wasm'
import { VideoData } from 'graphql/utils/Video'
import { TypeType } from 'graphql/schema'
import { VideoJsHotkeysOptions } from 'videojs-hotkeys'
import Description from './description'

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
        description: '',
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
const videoJsHotkeysOptions: VideoJsHotkeysOptions = {
  alwaysCaptureHotkeys: true,
  captureDocumentHotkeys: true,
}
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
      <h1 className='font-title font-bold text-ellipsis whitespace-nowrap overflow-hidden text-gray-800 p-6 pb-1 text-base md:text-6xl' title={video.title}>{video.title}</h1>
      <Description description={video.description} />      
      <div className='md:max-w-video mx-6 mb-6 md:mx-auto'>
        <VREPlayer 
          playerOptions={vsjOptions.playerOptions}
          videojsOptions={vsjOptions.videojsOptions}
          resources={resources}
          hideList={vsjOptions.hideList}
          onReady={(player: VideoJsPlayer) => {
            try {
              player.hotkeys(videoJsHotkeysOptions)
            } catch (e) {
              console.warn(e)
            }            

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
      </div>
    </>
  )
}
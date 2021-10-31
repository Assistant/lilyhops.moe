import { NextRouter, useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { Loader } from '../../components/utils/loader'
import { ErrorPage } from '../../components/utils/error'
import { VodData } from '../../components/utils/types/vods'
import { VideoJsPlayer } from 'video.js';
import VREPlayer from 'videojs-react-enhanced';
import SubtitlesOctopus from '../../public/lily/js/subtitles-octopus'
import { libassOptions } from '../../components/utils/types/libass-wasm'
import { GetVodProps, GetVodsProps, VideoData } from '../utils/types/video'

export const getPaths = () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getVodArgs = (root: string, regex: RegExp, type: string, id: string): GetVodProps => {
  const getVodsProps: GetVodsProps = {
    root: root,
    regex: regex,
    type: type === 'clips' ? 'clip' : 'vod',
  }
  const getVodProps: GetVodProps = {
    id: id,
    getVodsProps: getVodsProps,
  }
  return getVodProps
}

export const getVodProps = (videoData: VideoData, id: string, type: string) => {
  return {
    props: {
      id: id,
      vod: videoData.data,
      video: videoData.srcName,
      type: type,
    },
  }
}

export const errorProps = (code: number, type: string) => {
  return {
    props: {
      id: '',
      vod: {
        id: '',
        title: '',
        duration: '0s',
      },
      video: '',
      type: type,
      error: code,
    }
  }
}

export type VideoProps = {
  id: string,
  vod: VodData,
  video: string,
  type: 'vods'|'highlights'|'clips'
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
  if(props.error){
    return (
      <ErrorPage>
        <DefaultErrorPage statusCode={props.error}/>
      </ErrorPage>
    )
  }

  let prefix: string 
  switch (props.type) {
    case 'vods': {
      prefix = ""
      break
    }
    case 'highlights': {
      prefix = "highlights/"
      break
    }
    case 'clips': {
      prefix = "clips/"
      break
    }
  }

  const src: string = `/lily/${prefix}${props.video}`
  const poster: string = `/lily/${prefix}${props.id}.jpg`
  const subUrl: string = `/lily/${prefix}${props.id}.ssa.br`

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
        }}
      />
      <h1 className='font-title font-bold overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-800 m-0 p-4 text-6xl' title={props.vod.title}>{props.vod.title}</h1>
    </>
  )
}
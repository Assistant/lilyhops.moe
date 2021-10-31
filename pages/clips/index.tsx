import { GetServerSideProps , GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import { Loader, inifiniLoader } from '../../components/utils/loader'
import { ErrorPage } from '../../components/utils/error'
import { VodData } from '../../components/utils/types/vods'
import Thumbnail, { ThumbnailProps } from '../../components/video/thumbnail'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { peal, getVods } from '../../components/utils/vods'
import { ClipData } from '../../components/utils/types/clips'

type VodsProps = {
  vods: ClipData[],
  error?: number,
}

export default function Vods(props: VodsProps) {
  const [vods, setVods] = useState(props.vods)
  const [hasMore, setHasMore] = useState(true)
  const router = useRouter()
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

  const getMoreVods = async () => {
    const res = await fetch(`https://${window.location.hostname}/api/clips?start=${vods.length}`)
    const newVods: ClipData[] = await res.json()
    if (newVods.length === 0) {
      setHasMore(false)
      return
    }
    setVods((current: ClipData[]) => [...current, ...newVods])
  }  

  return (
    <InfiniteScroll
      className="gap-x-4 mb-4 mx-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      dataLength={vods.length}
      next={getMoreVods}
      hasMore={hasMore}
      loader={inifiniLoader}
    >
      {
        vods.map((vod: ClipData) => { 
          const thumbProps: ThumbnailProps = {
            id: vod.id,
            link: `/clips/${vod.id}`,
            title: vod.title,
            duration: Math.ceil(vod.duration).toString(),
            image: `/lily/clips/${vod.id}.jpg`,
          }
          return <Thumbnail key={vod.id} {...thumbProps}/>
        })
      }
    </InfiniteScroll>
  )
}

export const getServerSideProps: GetServerSideProps  = async (context: GetServerSidePropsContext) => {
  const vodsData: VodData[] = peal('clip')(getVods({root: './public/lily/clips', regex: /^(.*)\.mp4$/, type: 'clip'}))
  return {
    props: {
      vods: vodsData.slice(0, 24),
    }
  }
}
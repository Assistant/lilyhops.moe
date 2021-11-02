//import 'preact/debug'
import 'tailwindcss/tailwind.css'
import 'styles/global.css'
import 'video.js/dist/video-js.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from 'components/layout/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Lilyhops.moe archive</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" />
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  )
}
export default MyApp

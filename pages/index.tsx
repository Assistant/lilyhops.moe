import lilySocials from 'components/socials/people/lilyhops'
import giruSocials from 'components/socials/people/girutea'
import Social from 'components/socials/social'

export default function Home() {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-4 mb-6 mx-6 md:grid md:grid-cols-2`}>
      <div>
        <h1 className={`font-title text-4xl m-6 text-green-500 text-center justify-self-center content-evenly hidden md:!block`}>Welcome to my unofficial archive dedicated to my favorite streamer of all time, Lily Hopkins!</h1>
        <h1 className={`font-title text-4xl m-6 text-green-500 text-center justify-self-center content-evenly md:hidden`}>Lily Hopkins archive!</h1>
        <div className={`flex items-center justify-center gap-x-6`}>
          { lilySocials.map((social) => Social(social, 'text-green-500 hover:text-green-300')) }
        </div>
      </div>
      <div className={`relative`}>
        <img src='/lily/images/girutea-506.png' alt='Cute picture of Lily by Girutea' />
        <div className={`absolute block h-full w-full top-0 opacity-0 hover:opacity-100`}>
          <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 p-4 bg-black bg-opacity-50 rounded-xl flex flex-wrap items-center justify-center gap-x-3 md:gap-x-6`}>
            { giruSocials.map((social) => Social(social, 'text-green-500 hover:text-green-300')) }
          </div>
        </div>
      </div>
    </div>
  )
}
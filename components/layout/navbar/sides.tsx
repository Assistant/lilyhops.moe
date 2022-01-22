import Link from 'next/link'
const pages: string[] = ['/vods', '/highlights', '/clips']
export type SidesProps = {
  path: string,
}

export const LeftIcon = (props: SidesProps) => {
  const colors: string = 'text-green-900 hover:text-green-500 border-green-900 hover:border-green-500'
  if (props.path === '/') return <div className='flex'></div>
  else if (pages.includes(props.path)) return (
    <div className={`flex md:mx-1 md:mt-0 ${colors}`}>
      <Link href={'/'}>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </a>
      </Link>
    </div>
  )
  else return (
    <div className={`flex md:mx-1 md:mt-0 ${colors}`}>
      <Link href={`${pages.find((page) => props.path.includes(page))}`}>
        <a>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </a>
      </Link>
    </div>
  )
}

export const RightIcon = (props: SidesProps) => {
  if (props.path === '/') return <div className='md:!flex hidden'></div>
  else return <div className='w-10 md:mx-1 md:!flex hidden'></div>
}

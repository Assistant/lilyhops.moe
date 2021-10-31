import Duration from './duration'
import Image from 'next/image'
import Link from 'next/link'

export type ThumbnailProps = {
  id: string,
  link: string,
  title: string,
  duration: string,
  image: string,
}

export default function Thumbnail(props: ThumbnailProps) {
  return (
    <div>
      <h3 title={props.title} className='font-title font-bold overflow-ellipsis whitespace-nowrap overflow-hidden text-gray-800 my-2 text-2xl'>
        {props.title}
      </h3>
      <Duration value={props.duration} />
      <Link href={props.link} passHref>
        <a className='block aspect-w-16 aspect-h-9'>
          <Image src={props.image} alt={props.title} layout='fill' />
        </a>
      </Link>
    </div>
  )
}
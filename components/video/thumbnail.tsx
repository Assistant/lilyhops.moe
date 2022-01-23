import Duration from './duration'
import Date from './date'
import Link from 'next/link'

export type ThumbnailProps = {
  id: string,
  link: string,
  title: string,
  duration: string,
  created: string,
  image: string,
}

export default function Thumbnail(props: ThumbnailProps) {
  return (
    <div className={`relative`}>
      <h3 title={props.title} className='font-title font-bold text-ellipsis whitespace-nowrap overflow-hidden text-gray-800 mt-3 mb-1 text-2xl'>
        {props.title}
      </h3>
      <Duration value={props.duration} />
      <Date value={props.created} />
      <Link href={props.link} passHref>
        <a className='block aspect-w-16 aspect-h-9'>
          <img src={props.image} alt={props.title} />
        </a>
      </Link>
    </div>
  )
}
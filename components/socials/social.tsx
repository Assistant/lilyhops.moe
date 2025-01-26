import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from './icons'

export type SocialTypes = 'bluesky' | 'twitter' | 'deviantArt' | 'instagram' | 'tumblr' | 'twitch' | 'youtube' | 'patreon' | 'merch' | 'email'
export type SocialProps = {
  title: string,
  link: string,
  type: SocialTypes,
}

export default function Social(props: SocialProps, className: string = '', size: SizeProp = '2x') {
  return (
    <a href={props.link} title={props.title}>
      {Icon(props.type, className, size)}
    </a>
  )
}

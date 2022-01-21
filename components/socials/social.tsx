import { Icon } from './icons'

export type SocialTypes = 'twitter' | 'deviantArt' | 'instagram' | 'tumblr' | 'twitch' | 'patreon' | 'merch' | 'email'
export type SocialProps = {
  title: string,
  link: string,
  type: SocialTypes,
}

export default function Social(props: SocialProps) {
  return (
    <a href={props.link} title={props.title}>
      {Icon(props.type)}
    </a>
  )
}
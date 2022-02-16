import { SocialTypes } from './social'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { faStore, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faDeviantart, faInstagram, faTumblr, faTwitch, faYoutube, faPatreon } from '@fortawesome/free-brands-svg-icons'

export function Icon(type: SocialTypes, className: string, size: SizeProp) {
  return <FontAwesomeIcon icon={iconMap[type]} size={size} className={className} />
}

const iconMap: { [id: string]: IconDefinition } = {
  'twitter': faTwitter,
  'deviantArt': faDeviantart,
  'instagram': faInstagram,
  'tumblr': faTumblr,
  'twitch': faTwitch,
  'youtube': faYoutube,
  'patreon': faPatreon,
  'merch': faStore,
  'email': faEnvelope,
}
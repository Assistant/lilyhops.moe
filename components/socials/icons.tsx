import { SocialTypes } from './social'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { faStore, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faDeviantart, faInstagram, faTumblr, faTwitch, faYoutube, faPatreon } from '@fortawesome/free-brands-svg-icons'

export function Icon(type: SocialTypes, className: string, size: SizeProp) {
  switch (type) {
    case 'twitter': return <FontAwesomeIcon icon={faTwitter} size={size} className={className} />
    case 'deviantArt': return <FontAwesomeIcon icon={faDeviantart} size={size} className={className} />
    case 'instagram': return <FontAwesomeIcon icon={faInstagram} size={size} className={className} />
    case 'tumblr': return <FontAwesomeIcon icon={faTumblr} size={size} className={className} />
    case 'twitch': return <FontAwesomeIcon icon={faTwitch} size={size} className={className} />
    case 'youtube': return <FontAwesomeIcon icon={faYoutube} size={size} className={className} />
    case 'patreon': return <FontAwesomeIcon icon={faPatreon} size={size} className={className} />
    case 'merch': return <FontAwesomeIcon icon={faStore} size={size} className={className} />
    case 'email': return <FontAwesomeIcon icon={faEnvelope} size={size} className={className} />
  }
}
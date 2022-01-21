import { SocialTypes } from './social'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faDeviantart, faInstagram, faTumblr, faTwitch, faYoutube, faPatreon } from '@fortawesome/free-brands-svg-icons'

export function Icon(type: SocialTypes) {
  switch (type) {
    case 'twitter': return <FontAwesomeIcon icon={faTwitter} />
    case 'deviantArt': return <FontAwesomeIcon icon={faDeviantart} />
    case 'instagram': return <FontAwesomeIcon icon={faInstagram} />
    case 'tumblr': return <FontAwesomeIcon icon={faTumblr} />
    case 'twitch': return <FontAwesomeIcon icon={faTwitch} />
    case 'youtube': return <FontAwesomeIcon icon={faYoutube} />
    case 'patreon': return <FontAwesomeIcon icon={faPatreon} />
    case 'merch': return <FontAwesomeIcon icon={faStore} />
    case 'email': return <FontAwesomeIcon icon={faEnvelope} />
  }
}
export type VideoData = {
  id: string,
  title: string,
  description: string,
  videoUrl: string,
  thumbnailUrl: string,
  subtitleUrl: string,
}
export type ResponseVideoType = {
  videos: VideoData[],
}

const VOD_QUERY = `
  query Query($selector: Selector) {
    result: vods(selector: $selector) {
      videos {
        id
        title
        description
        videoUrl
        thumbnailUrl
        subtitleUrl
      }
    }
  }
`
const HIGHLIGHT_QUERY = `
  query Query($selector: Selector) {
    result: highlights(selector: $selector) {
      videos {
        id
        title
        description
        videoUrl
        thumbnailUrl
        subtitleUrl
      }
    }
  }
`
const CLIP_QUERY = `
  query Query($selector: Selector) {
    result: clips(selector: $selector) {
      videos {
        id
        title
        description
        videoUrl
        thumbnailUrl
        subtitleUrl
      }
    }
  }
`

export { VOD_QUERY, HIGHLIGHT_QUERY, CLIP_QUERY }
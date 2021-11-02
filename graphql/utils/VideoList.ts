export type VideoListData = {
  id: string,
  title: string,
  duration: string,
}
export type ResponseListType = {
  insert?: VideoListData[],
  videos: VideoListData[],
  nextId?: string,
}

const pageCount: number = 24
const VODS_QUERY = `
query Query($selector: Selector) {
  result: vods(selector: $selector) {
    insert {
      id
      title
      duration
    }
    videos {
      id
      title
      duration
    }
    nextId
  }
}
`
const HIGHLIGHTS_QUERY = `
query Query($selector: Selector) {
  result: highlights(selector: $selector) {
    insert {
      id
      title
      duration
    }
    videos {
      id
      title
      duration
    }
    nextId
  }
}
`
const CLIPS_QUERY = `
query Query($selector: Selector) {
  result: clips(selector: $selector) {
    insert {
      id
      title
      duration
    }
    videos {
      id
      title
      duration
    }
    nextId
  }
}
`

export { pageCount, VODS_QUERY, HIGHLIGHTS_QUERY, CLIPS_QUERY }
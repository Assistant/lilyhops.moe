import { VodData } from "./vods";
import { ClipData } from "./clips";

export type VideoData = VideoVodData | VideoClipData

export type VideoVodData = {
  type: 'vod',
  srcName: string,
  data: VodData,
}
export type VideoClipData = {
  type: 'clip',
  srcName: string,
  data: ClipData,
}

export type GetVodsProps = {
  type: 'vod' | 'clip',
  root: string,
  regex: RegExp,
}
export type GetVodProps = {
  id: string,
  getVodsProps: GetVodsProps,
}

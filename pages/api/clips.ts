// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ClipData } from '../../components/utils/types/clips'
import { VideoData } from '../../components/utils/types/video'
import { peal, getVods } from '../../components/utils/vods'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ClipData[]>
) {
  let start: number = 0
  const step: number = 24
  if (typeof req.query?.start === 'string' ) {
    start = parseInt(req.query.start, 10)
  }
  const vodsData: ClipData[] = peal('clip')(getVods({root: './public/lily/clips', regex: /^(.*)\.mp4$/, type: 'clip'}))
  res.status(200).json(vodsData.slice(start, start + step))
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { VodData } from '../../components/utils/types/vods'
import { peal, getVods } from '../../components/utils/vods'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<VodData[]>
) {
  let start: number = 0
  const step: number = 24
  if (typeof req.query?.start === 'string' ) {
    start = parseInt(req.query.start, 10)
  }
  const vodsData: VodData[] = peal('vod')(getVods({root: './public/lily/highlights', regex: /v(\d+).mp4$/, type: 'vod'}))
  res.status(200).json(vodsData.slice(start, start + step))
}

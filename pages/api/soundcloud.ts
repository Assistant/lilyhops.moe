// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type SoundCloudNormalized = {
  url: string,
  gain: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SoundCloudNormalized[]>
) {
  res.status(200).json(
    [
      {"url": "https://soundcloud.com/user-952658388/assembly", "gain": 3.97},
      {"url": "https://soundcloud.com/user-952658388/stargazing-indoors", "gain": 11.61},
      {"url": "https://soundcloud.com/user-952658388/long-time-ago", "gain": 8.65},
      {"url": "https://soundcloud.com/user-952658388/beach-on-the-moon", "gain": 11.93},
      {"url": "https://soundcloud.com/user-952658388/tidewater-blues1", "gain": 6.14},
      {"url": "https://soundcloud.com/user-952658388/buy-one-get-one", "gain": -0.14},
      {"url": "https://soundcloud.com/user-952658388/bookshelf",  "gain": 17.74},
      {"url": "https://soundcloud.com/user-952658388/doritos-for-breakfast", "gain": 9.69},
      {"url": "https://soundcloud.com/user-952658388/buzzbuzz", "gain": 5.47},
      {"url": "https://soundcloud.com/user-952658388/pond202105030", "gain": 11.27},
      {"url": "https://soundcloud.com/user-952658388/boundary20210529", "gain": -3.5},
      {"url": "https://soundcloud.com/user-952658388/papercraft20210528", "gain": 2.71},
      {"url": "https://soundcloud.com/user-952658388/curve20210527", "gain": 3.85},
      {"url": "https://soundcloud.com/user-952658388/oneword", "gain": -3.18},
      {"url": "https://soundcloud.com/user-952658388/you-snooze-you-lose", "gain": 1.61},
      {"url": "https://soundcloud.com/user-952658388/small-plate-microsushi1", "gain": 7.78},
      {"url": "https://soundcloud.com/user-952658388/sporecap2", "gain": -0.39},
      {"url": "https://soundcloud.com/user-952658388/horse4", "gain": 2.53},
      {"url": "https://soundcloud.com/user-952658388/quicksand", "gain": -6.4},
      {"url": "https://soundcloud.com/user-952658388/cave2", "gain": 14.28},
      {"url": "https://soundcloud.com/user-952658388/drum-practice", "gain": 13.47},
      {"url": "https://soundcloud.com/user-952658388/rainy", "gain": 3.27},
      {"url": "https://soundcloud.com/user-952658388/ketchup5", "gain": 9.28},
      {"url": "https://soundcloud.com/user-952658388/chicken-time1", "gain": 5.03},
      {"url": "https://soundcloud.com/user-952658388/cohesion", "gain": 4.82}
    ]      
  )
}

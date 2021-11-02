import { gql } from "@apollo/client"
import client from "graphql/client"
import { ResponseVideoType } from "./Video"

const fetchVideo = async (query: string, id: string): Promise<ResponseVideoType> => {
  const response: ResponseVideoType = await client.query({query: gql(query), variables: {
    "selector": {
      "limit": 1,
      "id": id,
    },
  }}).then((result) =>  result.data.result)
  return response
}

export default fetchVideo

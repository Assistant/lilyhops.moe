import { gql } from "@apollo/client"
import client from "graphql/client"
import { SelectorType } from "graphql/schema"
import { ResponseListType } from "./VideoList"

const fetchVideoList = async (query: string, selector: SelectorType): Promise<ResponseListType> => {
  const response: ResponseListType = await client.query({query: gql(query), variables: {
    "selector": {
      "limit": selector.limit,
      "id": selector.id,
      "start": selector.start,
    },
  }}).then((result) =>  result.data.result)
  return response
}

export default fetchVideoList
import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Video {
    id: String!
    title: String!
    videoUrl: String!
    duration: String!
    subtitleUrl: String
    type: String!
    thumbnailUrl: String
  }

  type Query {
    vods(id: String): [Video]
    highlights(id: String): [Video]
    clips(id: String): [Video]
  }
`
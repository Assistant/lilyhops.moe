import { ApolloClient, InMemoryCache } from '@apollo/client'
const hostname: string = (process && process.env.NODE_ENV === 'development') ? 'dev.lilyhops.moe' : 'new.lilyhops.moe'
const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  uri: `https://${hostname}/api/graphql`,
  cache: new InMemoryCache(),
})
export default client
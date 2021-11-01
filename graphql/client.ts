import { ApolloClient, InMemoryCache } from '@apollo/client'
const client = new ApolloClient({
  uri: `https://${window.location.hostname}/api/graphql`,
  cache: new InMemoryCache(),
})
export default client
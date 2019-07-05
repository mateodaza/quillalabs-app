import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getCurrentUser {
          getCurrentUser {
            user {
              id
              email
              username
            }
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data }
    })
    .catch((e) => {
      // Fail gracefully
      // console.log({e})
      return { loggedInUser: {} }
    })

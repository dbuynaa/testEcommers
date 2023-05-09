import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';

let erxesApolloClient: any = null;

export const getErxesApolloClient = () => {
  if (erxesApolloClient) {
    return erxesApolloClient;
  }

  console.log(process.env.NEXT_PUBLIC_ERXES_API_URL, 'rrr');

  const httpLink = new HttpLink({
    uri:
      `${process.env.NEXT_PUBLIC_ERXES_API_URL}/graphql` ||
      'http://localhost:4000/graphql',
    credentials: 'include',
  });

  const authLink = new ApolloLink((operation, forward) => {
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        'erxes-app-token': process.env.NEXT_PUBLIC_ERXES_APP_TOKEN,
      },
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  erxesApolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    credentials: 'include',
    cache: new InMemoryCache(),
  });

  return erxesApolloClient;
};

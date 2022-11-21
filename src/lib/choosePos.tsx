import { getErxesApolloClient } from 'modules/ssClient';
import { mutations } from 'modules/auth/graphql';

const choosePos: () => Promise<any> = async () => {
  const apolloClient = getErxesApolloClient();

  apolloClient
    .mutate({
      mutation: mutations.posChooseConfig,
      variables: { token: process.env.POS_TOKEN },
    })
    .then(({ data }: any) => console.log(data))
    .catch(({ message }: any) => console.log(message));
};

export default choosePos;

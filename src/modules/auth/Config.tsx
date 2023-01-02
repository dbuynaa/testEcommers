'use client';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { mutations, queries } from './graphql';
import { useConfig } from 'modules/appContext';
import Loading from 'ui/Loading';

const Config = ({ children }: any) => {
  const { setConfig } = useConfig();

  const [getConfig, { loading }] = useLazyQuery(queries.currentConfig, {
    onCompleted(data) {
      setConfig(data);
    },
  });

  const [posChooseConfig, { loading: load }] = useMutation(
    mutations.posChooseConfig,
    {
      onCompleted() {
        getConfig();
      },
    }
  );

  useEffect(() => {
    posChooseConfig({
      variables: { token: process.env.NEXT_PUBLIC_ERXES_POS_TOKEN },
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || load) return <Loading className="min-h-full" />;

  return children;
};

export default Config;

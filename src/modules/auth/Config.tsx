'use client';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { mutations, queries } from './graphql';
import { useConfig } from 'modules/appContext';
import Loading from 'ui/Loading';

const Config = ({ children }: any) => {
  const { setConfig } = useConfig();
  const [loading, setLoading] = useState(true);

  const [getConfig] = useLazyQuery(queries.currentConfig, {
    onCompleted(data) {
      setLoading(false);
      const currentConfig = (data || {}).currentConfig;
      setConfig(currentConfig);
    },
  });

  const [posChooseConfig] = useMutation(mutations.posChooseConfig, {
    onCompleted() {
      getConfig();
    },
  });

  useEffect(() => {
    posChooseConfig({
      variables: { token: process.env.NEXT_PUBLIC_ERXES_POS_TOKEN },
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading className="min-h-full" />;

  return children;
};

export default Config;

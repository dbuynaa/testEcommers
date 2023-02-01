'use client';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { mutations, queries } from './graphql';
import { useConfig } from 'modules/appContext';
import Loading from 'ui/Loading';

const Config = ({ children }: any) => {
  const { setConfig } = useConfig();

  const { loading } = useQuery(queries.currentConfig, {
    onCompleted(data) {
      const currentConfig = (data || {}).currentConfig;
      setConfig(currentConfig);
    },
  });

  if (loading) return <Loading className="min-h-full payments" />;

  return children;
};

export default Config;

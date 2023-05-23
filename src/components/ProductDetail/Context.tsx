import { useRouter } from 'next/router';
import { createContext, useContext, useState } from 'react';
import { readFile } from 'utils';
import { useQuery } from '@apollo/client';
import { queries } from 'modules/Products/graphql';

const DetailContext = createContext({} as any);

export const useDetailContext = () => useContext(DetailContext);

const Context = ({ children }: any) => {
  const router = useRouter();
  const { id, loading } = router.query;
  const [store, setStore] = useState<any>(null);

  const { data } = useQuery(queries.productDetail, {
    variables: {
      id,
      branchId: process.env.NEXT_PUBLIC_BRANCH_ID,
    },
    onCompleted(data) {
      const detail = (data || {}).poscProductDetail || {};
      const { attachment, attachmentMore } = detail;

      const moreImage = (attachmentMore || []).map(({ url }: { url: string }) =>
        readFile(url)
      );

      setStore({
        ...detail,
        customFieldsDataByFieldCode: null,
        properties: detail.customFieldsDataByFieldCode || {},
        images: [readFile((attachment || {}).url), ...moreImage],
      });
    },
  });

  const { name, unitPrice } = (data || {}).poscProductDetail || {};

  if (loading) return null;

  if (!name || !unitPrice || id !== (store || {})._id) {
    return null;
  }

  return (
    <DetailContext.Provider value={store}>{children}</DetailContext.Provider>
  );
};

export default Context;

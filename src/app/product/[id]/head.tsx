import getProductDetail from 'lib/getProductDetail';
import { use } from 'react';

const Head = ({ params }: any) => {
  const { id } = params;
  const detail = use(getProductDetail(id));

  const { attachment, name, code } = detail;

  return (
    <>
      <title>{name}</title>
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_URL}/product/${params.id}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={name} />
      <meta property="og:description" content={code} />
      <meta property="og:image" content={(attachment || {}).sourceUrl} />
    </>
  );
};

export default Head;

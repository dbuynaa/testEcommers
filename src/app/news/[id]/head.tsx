import { getPostById } from 'lib/wp/posts';
import { use } from 'react';

const Head = ({ params }: { params: { id: string } }) => {
  const { post } = use(getPostById(decodeURIComponent(params.id)));
  const { title, featuredImage, excerpt } = post;

  return (
    <>
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_URL}/news/${params.id}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:image" content={featuredImage.node.sourceUrl} />
    </>
  );
};

export default Head;

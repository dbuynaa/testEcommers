import type { GetStaticPaths, GetStaticProps } from 'next';
import { getPostById } from 'lib/wp/posts';
import dayjs from 'dayjs';
import Image from 'ui/Image';
import Button from 'ui/Button';
import Twitter from 'icons/Twitter';
import Link from 'next/link';
import FacebookShare from 'components/news/FacebookShare';
import { NextSeo } from 'next-seo';

const PostDetail = ({ post }) => {
  const { title, featuredImage, excerpt, id, content, date } = post || {};
  const removeTag = (html: any) => {
    const desc = html.slice(3, -5);
    return desc;
  };
  return (
    <>
      <NextSeo
        title={title}
        description={removeTag(excerpt)}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_URL}/news/${id}`,
          images: [
            {
              url: featuredImage.node.sourceUrl,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
      />
      <article className="container news-detail py-5">
        <div className="-date text-mid-gray">
          {dayjs(date).format('MM сарын DD, YYYY')}
        </div>
        <h4 className="py-4">{title}</h4>
        <div className="img-wrap yt-video ratio">
          <Image src={featuredImage.node.sourceUrl} alt="" sizes="100vw" />
        </div>
        <div className="pt-4 container c-md flex items-center justify-end share-container">
          <FacebookShare title={title} id={id} />
          <Button
            className="-twitter share"
            variant="slim"
            Component={Link}
            href={`${process.env.NEXT_PUBLIC_URL}`}
          >
            <Twitter />
          </Button>
        </div>
        <div
          className="py-4 container c-md"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </article>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    return { notFound: true };
  }

  const { post } = await getPostById(decodeURIComponent(params.id + ''));

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default PostDetail;

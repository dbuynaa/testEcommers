import type { GetStaticPaths, GetStaticProps } from 'next';
import { getNewsIds, getPostById } from 'lib/wp/posts';
import dayjs from 'dayjs';
import Image from 'ui/Image';
import { NextSeo } from 'next-seo';
import { FacebookShareButton } from 'next-share';
import Facebook from 'icons/Facebook';
import Button from 'ui/Button';

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
          <FacebookShareButton
            url={'https://www.techstore.mn/news/' + id}
            title={post.title}
            quote={post.description}
          >
            <Button className="share -facebook">
              <Facebook />
            </Button>
          </FacebookShareButton>
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
    revalidate: 120,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await getNewsIds();
  const paths = (posts || []).map((item: any) => {
    // const id = Buffer.from(item.id, 'base64').toString('ascii');
    return { params: { id: item?.id } };
  });

  return {
    paths,
    fallback: false,
  };
};

export default PostDetail;

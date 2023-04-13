import NewsBanner from 'components/news/banner';
import Scroll from 'components/news/scroll';
import Other from 'components/news/Other';
import { getNews } from 'lib/wp/posts';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';

const News = ({ posts }) => {
  const lastPost = (posts || [])[0] || {};

  return (
    <>
      <NextSeo
        title={'Mэдээ мэдээлэл | TechNews'}
        description="Технологийн сүүлийн үеийн мэдээ мэдээлэл"
        openGraph={{
          url: 'https://www.technews.mn/news',
          images: [
            {
              url: lastPost.featuredImage?.sourceUrl,
              width: 800,
              height: 600,
              alt: lastPost.title,
            },
          ],
        }}
      />
      <div className="container py-3 news">
        <div className="row news-header">
          <NewsBanner post={lastPost} />
          <Scroll posts={(posts || []).slice(1)} />
        </div>
        <Other />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { posts } = await getNews();

  return {
    props: { posts },
  };
};

export default News;

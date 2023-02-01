import { use } from 'react';
import { getPostById } from 'lib/wp/posts';
import dayjs from 'dayjs';
import Image from 'ui/Image';
import Button from 'ui/Button';
import Twitter from 'icons/Twitter';
import Link from 'next/link';
import FacebookShare from 'components/news/FacebookShare';

const Detail = ({ params }: any) => {
  const { post } = use(getPostById(decodeURIComponent(params.id)));

  const { title, date, featuredImage, content } = post;

  if (!title) return null;

  return (
    <article className="container news-detail py-5">
      <div className="-date text-mid-gray">
        {dayjs(date).format('M сарын D, YYYY')}
      </div>
      <h4 className="py-4">{title}</h4>
      <div className="img-wrap yt-video ratio">
        <Image src={featuredImage.node.sourceUrl} alt="" sizes="100vw" />
      </div>
      <div className="pt-4 container c-md flex items-center justify-end share-container">
        <FacebookShare title={title} id={params.id} />
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
  );
};
export default Detail;

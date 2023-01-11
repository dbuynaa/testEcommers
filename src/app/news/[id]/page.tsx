import { use } from 'react';
import { getPostById } from 'lib/wp/posts';
import dayjs from 'dayjs';
import Image from 'ui/Image';
import Button from 'ui/Button';
import Facebook from 'icons/Facebook';
import Twitter from 'icons/Twitter';
import Link from 'next/link';

const Detail = ({ params }: any) => {
  const { post } = use(getPostById(decodeURIComponent(params.id)));

  const { title, date, featuredImage, content } = post;
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
        <Button
          className="-facebook share"
          variant="slim"
          Component="a"
          data-service="facebook"
          data-url={`${process.env.NEXT_PUBLIC_URL}/news/${params.id}`}
          data-title={title}
        >
          <Facebook />
        </Button>
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

import { getAbout } from 'lib/wp/page';
import Image from 'ui/Image';
import { getBrands } from '../lib/wp/posts';
import Slider from 'ui/Slider';

const About = ({ page, posts }) => {
  const { featuredImage, content } = page;

  const settings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="about">
      <div className="img-wrap ratio about-thumbnail">
        <Image src={featuredImage.sourceUrl} alt="about" quality={100} />
      </div>
      <Slider className="about-slider" {...settings}>
        {(posts || []).map((post, idx) => (
          <div key={idx}>
            <div className="about-slider-item row justify-center items-center py-md-3 py-2">
              <div className="img-wrap">
                <Image
                  fill
                  src={post.featuredImage.sourceUrl}
                  alt={post.title}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="bg-shade-gray">
        <div className="container">
          <h6 className="text-center pt-4">БИДНИЙ ТУХАЙ</h6>
          <div
            className="pb-5 pt-4 container "
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const { page } = await getAbout();
  const { posts } = await getBrands();
  return {
    props: { page, posts },
    revalidate: 60,
  };
};

export default About;

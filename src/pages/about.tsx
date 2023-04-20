import { getAbout } from 'lib/wp/page';
import Image from 'ui/Image';

const About = ({ page }) => {
  const { featuredImage, content } = page;
  return (
    <div className="container">
      <div className="img-wrap ratio yt-video mt-3 mb-4">
        <Image src={featuredImage.sourceUrl} alt="about" quality={100} />
      </div>

      <div
        className="py-4 container c-md"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export const getStaticProps = async () => {
  const { page } = await getAbout();
  return {
    props: { page },
    revalidate: 60,
  };
};

export default About;

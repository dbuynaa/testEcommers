import { getTermsOfUse } from 'lib/wp/page';

const TermsOfService = ({ page }) => {
  return (
    <article
      className="container c-xl pt-4 pb-5 news-detail"
      dangerouslySetInnerHTML={{ __html: page?.content || '' }}
    ></article>
  );
};

export default TermsOfService;

export const getStaticProps = async () => {
  const { page } = await getTermsOfUse();
  return {
    props: { page },
    revalidate: 60,
  };
};

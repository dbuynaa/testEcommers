import { getTermsOfUse } from 'lib/wp/page';
import { use } from 'react';

const TermsOfService = () => {
  const { page } = use(getTermsOfUse());
  return (
    <article
      className="container c-xl pt-4 pb-5 news-detail"
      dangerouslySetInnerHTML={{ __html: page?.content || '' }}
    ></article>
  );
};

export default TermsOfService;

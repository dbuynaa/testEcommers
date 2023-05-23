import Branch from 'components/branch';
import { getBranches } from 'lib/wp/posts';
import type { GetStaticProps } from 'next';

const Branches = ({ posts }) => {
  return (
    <div className="py-2 py-md-3 container">
      {posts.map((post, index) => (
        <Branch key={index} {...post} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { posts } = await getBranches();

  return {
    props: { posts }
  };
};

export default Branches;

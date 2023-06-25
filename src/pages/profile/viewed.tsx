import Layout from 'components/profile/layout';
import ViewedItemsContainer from 'modules/Products/ViewedItems';

const Viewed = () => {
  return (
    <div className="container">
      <ViewedItemsContainer />
    </div>
  );
};

Viewed.getLayout = (page) => <Layout>{page}</Layout>;

export default Viewed;

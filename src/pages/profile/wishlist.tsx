import Layout from 'components/profile/layout';


import WishlistContainer from 'modules/Products/Wishlist';



const Wishlist = () => {
  return (
    <div className="container">
      <WishlistContainer />
 

    </div>
  );
};

Wishlist.getLayout = (page) => <Layout>{page}</Layout>;

export default Wishlist;

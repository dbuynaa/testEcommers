import FeaturedCategory from './FeaturedCategory';

const FeaturedCategories = ({ ftCats }: any) => {
  return (
    <div className="my-3 my-md-4 ft-cats container">
      {/* <h4 className="text-blue text-center mb-md-4 mb-0">Онцлох ангилал</h4> */}
      <div className="row justify-center">
        {ftCats.map((post: any, idx: number) => (
          <FeaturedCategory {...post} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;

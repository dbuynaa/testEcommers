import FeaturedCategory from './FeaturedCategory';

const FeaturedCategories = ({ ftCats }: any) => {
  return (
    <div className="my-md-5 my-4 ft-cats container c-xl">
      <h4 className="text-blue text-center mb-md-4 mb-0">Онцлох ангилал</h4>
      <div className="row">
        {ftCats.map((post: any, idx: number) => (
          <FeaturedCategory {...post} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;

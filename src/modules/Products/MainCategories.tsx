// import Link from 'next/link';
import MainCategory from 'components/Products/MainCategory';
type Category = {
  _id: string;
  name: string;
  parentId: string;
};
const MainCategories = ({ mainCategories }) => {
  const getSubCategories = (id) =>
    mainCategories.filter((a) => a.parentId === id);

  return (
    <div className="product-cats hidden lg:flex">
      <div className="container flex justify-between">
        {(mainCategories || [])
          .filter((a) => !a.parentId)
          .map(({ _id, name }): any => (
            <MainCategory
              _id={_id}
              name={name}
              subCategories={getSubCategories(_id)}
              key={_id}
            />
          ))}
      </div>
    </div>
  );
};

export default MainCategories;

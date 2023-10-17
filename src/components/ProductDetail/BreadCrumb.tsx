import Link from "next/link";
import { useDetailContext } from "components/ProductDetail/Context";
import { useCategories } from "modules/appContext";
import clsx from "clsx";

const Breadcrumb = () => {
  const { categories } = useCategories();

  const { categoryId, name } = useDetailContext();

  const category =
    (categories || []).find(({ _id }: any) => _id === categoryId) || {};

  const findCatByCode = (str: string) => {
    return (categories || []).find(
      ({ code }: { code: string }) => str === code
    );
  };

  const codes = (category.order || "").split("/") || [];
  const parentCodes = codes.slice(0, codes.indexOf(category.code));

  const parentCats = parentCodes.map((code: string) => findCatByCode(code));

  console.log("categ: ", parentCats);
  return (
    <div className="py-md-4 py-3">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">Нүүр</Link>
        </li>
        {parentCats._id &&
          parentCats.map(({ _id, name: catName }: any) => (
            <li className="breadcrumb-item" key={_id}>
              <Link href={`/products?category=${_id}`}>{catName}</Link>
            </li>
          ))}
        <li className="breadcrumb-item">
          <Link href={`/products?category=${category._id}`}>
            {category.name}
          </Link>
        </li>
        <li
          className={clsx("breadcrumb-item", name.length > 30 && "text-wrap")}
        >
          {name}
        </li>
      </ol>
    </div>
  );
};

export default Breadcrumb;

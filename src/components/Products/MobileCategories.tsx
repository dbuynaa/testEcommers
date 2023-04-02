
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'ui/Button';
import clsx from 'clsx';
import Link from 'next/link';

type ICategory = { name: string; _id?: string; parentId: string };
type IFindChildren = (parent?: string | string[]) => (ICategory | undefined)[];

const MobileCategories = ({
  categories,
  rootCatergories,
}: {
  categories: ICategory[];
  rootCatergories: any;
}) => {
  const router = useRouter();
  const { category } = router.query;

  const [renderCats, setRenderCats] =
    useState<(ICategory | undefined)[]>(rootCatergories);

  const findChildren: IFindChildren = (parent) => {
    const children = categories.filter(({ parentId }) => parentId === parent);

    const chosenCat = categories.find(({ _id }: any) => parent === _id);

    if (chosenCat && children.length === 0)
      return findChildren(chosenCat.parentId);

    if (children.length > 0) return [chosenCat, ...children];

    return [];
  };

  const mainCats = categories.filter(
    ({ parentId }: any) => parentId === rootCatergories[0]?._id
  );
  const parent = categories.find(
    ({ _id }) =>
      _id === categories.find(({ _id }) => _id === category)?.parentId
  );

  useEffect(() => {
    if (!rootCatergories.length) {
      setRenderCats(categories);
      return;
    }

    if (!category) {
      setRenderCats([...rootCatergories, ...mainCats]);
      return;
    }
    setRenderCats(findChildren(category));
  }, [categories, category]);

  return (
    <div className="mobile-cats flex items-center">
      {parent && (
        <Button
          Component={Link}
          variant="slim"
          className={clsx(category === parent._id && '-active')}
          href={`/products?category=${parent._id}`}
        >
          {parent.name}
        </Button>
      )}
      {(renderCats || []).map(({ _id = '', name = '' }: any) => (
        <Button
          Component={Link}
          key={_id}
          variant="slim"
          className={clsx(category === _id && '-active')}
          href={`/products?category=${_id}`}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default MobileCategories;

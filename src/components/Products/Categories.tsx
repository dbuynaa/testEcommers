import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import ChevronRight from 'icons/ChevronRight';
import { useSetActiveCategoryName } from 'modules/Products/context';
import { useEffect } from 'react';

const Categories = ({
  categories,
  showAll,
}: {
  categories: any;
  showAll?: boolean;
}) => {
  const router = useRouter();
  const { category, sub } = router.query;
  const setName = useSetActiveCategoryName();

  const activeCat = categories.find((cat) => cat._id === (sub || category));

  useEffect(() => {
    setName(activeCat.name);
  }, [activeCat.name, category, setName]);

  const cts = categories.map((ct) => {
    const { order, parentId, name: nameStr, _id } = ct;

    const m = order.match(/[/]/gi);

    let marginLeft = 0;

    if (m) {
      marginLeft = (m.length - 1) * 28;
    }

    const name =
      m.length === 1 ? (
        <span className="flex items-center">
          <ChevronRight /> {nameStr}
        </span>
      ) : (
        nameStr
      );

    const show =
      showAll ||
      parentId === category ||
      activeCat.parentId === parentId ||
      m.length < 2;

    const margin = 6;

    return (
      <AnimatePresence key={_id}>
        {show && (
          <motion.div
            initial={{
              marginTop: 0,
              marginBottom: 0,
              opacity: 0,
              height: 0,
            }}
            animate={{
              marginTop: margin,
              marginBottom: margin,
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              marginTop: 0,
              marginBottom: 0,
              opacity: 0,
              height: 0,
            }}
          >
            <Link
              href={{
                pathname: 'products',
                query: {
                  category: parentId || _id,
                  sub: parentId ? _id : undefined,
                },
              }}
              style={{ marginLeft }}
              className={clsx('block tree-item', {
                '-active':
                  _id === category ||
                  sub === _id ||
                  activeCat?.parentId === _id,
              })}
            >
              {name}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    );
  });

  return (
    <>
      <b className="block text-blue products-cat-title text-mid-gray">
        Бүтээгдэхүүний ангилал
      </b>
      <div className="tree">{cts}</div>
    </>
  );
};

export default Categories;

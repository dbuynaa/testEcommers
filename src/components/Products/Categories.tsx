/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Tree from 'rc-tree';
import ChevronRight from 'icons/ChevronRight';
import { useSetActiveCategoryName } from 'modules/Products/context';

const formatToTree = (root: any, all: any) => {
  const result: any = [];
  root.forEach((child: any) => {
    const { _id } = child;
    const children = all.filter(
      ({ parentId }: { parentId: string }) => parentId === _id
    );
    if (children.length > 0) {
      return result.push({ ...child, children: formatToTree(children, all) });
    }
    return result.push({ ...child, children: [] });
  });

  return result;
};

const motion = {
  motionName: 'node-motion',
  motionAppear: true,
  onAppearStart: () => ({ height: 0 }),
  onAppearActive: (node: any) => ({ height: node.scrollHeight }),
  onLeaveStart: (node: any) => ({ height: node.offsetHeight }),
  onLeaveActive: () => ({ height: 0 }),
};

const ProductCategories = ({ categories, rootCatergories }: any) => {
  const router = useRouter();
  const { category: activeCat } = router.query;
  const [expandedKeys, setExpandedKeys] = useState<any>();
  const setActiveCatName = useSetActiveCategoryName();

  const mapToAddKey = (arr: any) =>
    arr.map((cat: any) => ({
      ...cat,
      key: cat.order,
      title: !cat.parentId ? <b className="sbt">{cat.name} </b> : cat.name,
    }));

  useEffect(() => {
    if (activeCat) {
      const newActiveCats = [] as string[];
      const getExpandedKeys: any = (currentId: string) => {
        const cat = categories.find(({ _id }: any) => _id === currentId);

        if (cat) {
          newActiveCats.push(cat.order);
          cat._id === activeCat && setActiveCatName(cat.name);
          if (!cat.isRoot) {
            return getExpandedKeys(cat.parentId);
          }
        }
      };
      getExpandedKeys(activeCat);
      setExpandedKeys(newActiveCats);
    }
  }, [activeCat]);

  return (
    <>
      <b className="block text-blue products-cat-title text-mid-gray">
        Бүтээгдэхүүний ангилал
      </b>
      <div className="tree-animation">
        <Tree
          expandedKeys={
            router.pathname !== '/categories'
              ? expandedKeys
              : categories.map(({ order }: any) => order)
          }
          treeData={formatToTree(
            mapToAddKey(rootCatergories),
            mapToAddKey(categories)
          )}
          icon={<></>}
          switcherIcon={<ChevronRight />}
          motion={motion}
          onSelect={(selectedKeys, info) => {
            if (selectedKeys.length === 0) {
              return;
            }
            const { _id }: any = (info || {}).node || {};
            _id && router.push(`/products?category=${_id}`);
          }}
        />
      </div>
    </>
  );
};

export default ProductCategories;

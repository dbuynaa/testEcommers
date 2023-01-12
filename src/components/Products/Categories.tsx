/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Tree from 'rc-tree';
import ChevronRight from 'icons/ChevronRight';
import { useProducts } from 'modules/Products/context';

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeCat = searchParams.get('category');
  const [expandedKeys, setExpandedKeys] = useState<any>();
  const [store, setStore] = useProducts(
    ({ activeCategoryName }) => activeCategoryName
  );

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
          cat._id === activeCat && setStore({ activeCategoryName: cat.name });
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
    <div className="tree-animation">
      <p className="p-2 sbt text-mid-gray">Бүтээгдэхүүний ангилал</p>
      <Tree
        expandedKeys={
          pathname !== '/categories'
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
  );
};

export default ProductCategories;

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from 'ui/Button';
import clsx from 'clsx';
import Link from 'next/link';

type ICategory = { name: string; _id?: string; parentId: string };

const MobileCategories = ({ categories }: { categories: ICategory[] }) => {
  const router = useRouter();
  const { category, sub } = router.query;

  return (
    <div className="mobile-cats flex items-center mb-3">
      {(categories || [])
        .filter((cat) => !!cat)
        .map((cat: any) => (
          <Button
            Component={Link}
            key={cat?._id}
            variant="slim"
            className={clsx(
              (sub || category)?.toString() === cat?._id && '-active'
            )}
            href={{
              pathname: 'products',
              query: { ...router.query, sub: cat?._id },
            }}
          >
            {cat?.name}
          </Button>
        ))}
    </div>
  );
};

export default MobileCategories;

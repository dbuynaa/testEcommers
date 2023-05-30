import Heart from 'icons/Heart';
import Button from 'ui/Button';
import { mutations, queries } from './graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useCurrentUser } from 'modules/appContext';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { toast } from 'react-toastify';

const AddToWishlist = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const { currentUser } = useCurrentUser();
  const { erxesCustomerId: customerId } = currentUser || {};
  const router = useRouter();

  const variables = {
    customerId,
    productId: router.query.id,
  };

  const { data } = useQuery(queries.wish, {
    variables,
    skip: !customerId,
  });

  const id = data?.wish?._id;

  const [add, { loading: loadingAdd }] = useMutation(mutations.wishlistAdd, {
    variables,
    refetchQueries: [{ query: queries.wish }, 'Wish'],
    onCompleted(data) {
      const { _id } = data?.wishlistAdd;
      if (_id) {
        toast.success('Амжилттай нэмлээ');
      }
    },
  });

  const [remove, { loading: loadingRemove }] = useMutation(
    mutations.wishlistRemove,
    {
      variables: { id },
      refetchQueries: [{ query: queries.wish }, 'Wish'],
      onCompleted(data) {
        const { _id } = data?.wishlistRemove;
        if (_id) {
          toast.success('Амжилттай хаслаа');
        }
      },
    }
  );

  const handleClick = () => {
    if (!customerId) return toast.error('Та эхлээд нэвтэрнэ үү');
    if (id) return remove();
    return add();
  };

  const loading = loadingAdd || loadingRemove;

  return (
    <Button
      variant="ghost"
      className={clsx('with-icon wishlist-add', id && 'added', className)}
      disabled={loading}
      onClick={handleClick}
    >
      <Heart fill={id} />
      <span>{!!id ? 'Хадгалсан' : 'Хадгалах'}</span>
    </Button>
  );
};

export default AddToWishlist;

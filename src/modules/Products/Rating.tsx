import { useMutation } from '@apollo/client';
import { mutations, queries } from './graphql';
import { useState } from 'react';
import { useCurrentUser } from 'modules/appContext';

import Rate from 'components/Rate';

const Rating = ({ productId }: { productId: string }) => {
  const half = (n: any) => Number((Math.round(n * 2) / 2).toFixed(1));
  const [rating, setRating] = useState(0);
  const [add, { loading }] = useMutation(mutations.ReviewAdd);
  const { currentUser } = useCurrentUser();

  const handleRate = (rate: number) => {
    setRating(rate);
    add({
      variables: {
        productId: productId,
        customerId: currentUser?.erxesCustomerId,
        review: rate
      },
      refetchQueries: [{ query: queries.getProductReviews }, 'Productreviews']
    });
  };

  return <Rate value={rating} onChange={handleRate} />;
};

export default Rating;

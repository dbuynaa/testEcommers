import { mutations, queries } from './graphql';

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { getErxesApolloClient } from 'modules/ssClient';
import CurrentUser from 'modules/auth/currentUser';
import { useCurrentUser } from 'modules/appContext';

const LastViewProduct = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const productId = router.query._id;
  const { erxesCustomerId: customerId } = currentUser || {};

  const { data = {} as any } = useQuery(queries.productDetail, {
    variables: {
      id: productId
    }
  });
  const product = data.productDetail || [];

  const { data: productCategories } = useQuery(queries.productCategories, {
    variables: {
      id: product.parentId || ''
    }
  });

  const { data: reviewData } = useQuery(queries.getProductAveregeReview, {
    variables: {
      productId: productId
    }
  });
  const { average, length: reviewLength } =
    (reviewData && reviewData.productreview) || [];
  const { data: reviewsData } = useQuery(queries.getProductReviews, {
    variables: {
      productIds: productId,
      customerId: CurrentUser
    }
  });
  const reviews = (reviewsData && reviewsData.productreviews) || [];

  const { data: lastViewsData } = useQuery(queries.getLastProductView, {
    client: getErxesApolloClient(),
    variables: { customerId, limit: 20 }
  });

  const [setView, { data: view }] = useMutation(mutations.addToLastView, {
    client: getErxesApolloClient(),
    refetchQueries: [
      {
        query: queries.getLastProductView,
        variables: { customerId }
      }
    ]
  });

  const [removeView, { data: remove }] = useMutation(mutations.ReviewRemove, {
    client: getErxesApolloClient(),
    refetchQueries: [
      {
        query: queries.getLastProductView,
        variables: { customerId }
      }
    ]
  });

  const viewData = lastViewsData?.lastViewedItems || [];

  const viewFunc = (id: any, productId: any, firstToRemove: any) => {
    if (viewData.length < 12) {
      setView({
        variables: {
          productId: productId,
          customerId: id
        }
      });
    } else {
      removeView({
        variables: {
          id: firstToRemove
        }
      }).then(() => {
        setView({
          variables: {
            productId: productId,
            customerId: id
          }
        });
      });
    }
  };
  const updatedProps = {
    product,
    viewData,
    viewFunc,
    average,
    reviews,
    reviewLength
  };
  return { ...updatedProps };
};
export default LastViewProduct;

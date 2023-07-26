import React, { createContext, useContext, useMemo } from 'react';


const WholeProductContext = createContext<any>(null);

const useWholeProductContext = () => useContext(WholeProductContext);

const WholeProductProvider = ({
  children,
  wholeProducts,
  wholeSales,
  refetch
}) => {
  console.log('wholedata, wholeProducts', wholeSales, wholeProducts);
  const wholeData = useMemo(() => {
    let list = wholeProducts.map((wholeProduct: any) => {
      const wholeSale: any = wholeSales.find(
        (a: any) => !!a.products.find((b: any) => b === wholeProduct._id)
      );
      return {
        ...wholeProduct,
        productDetail: wholeSale,
        endDate: wholeSale?.endDate
      };
    });

    let first = list.shift();

    return {
      first,
      list: [...list, ...list, ...list]
    };
  }, [wholeSales, wholeProducts]);;


  const contextValue = {
    wholeData,
    refetch
  };


  return (
    <WholeProductContext.Provider value={contextValue}>
      {children}
    </WholeProductContext.Provider>
  );
};
export default WholeProductProvider;

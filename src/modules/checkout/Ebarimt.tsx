/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import Input from 'ui/Input';
import { useFormContext, useWatch } from 'react-hook-form';
import clsx from 'clsx';
import FormItem from 'ui/FormItem';
import { useLazyQuery, gql } from '@apollo/client';
import { queries } from './graphql';
import { toast } from 'react-toastify';
import useOrderData from 'lib/useOrderData';
import LoadingDots from 'ui/LoadingDots';

const Ebarimt = () => {
  const orderData = useOrderData();
  const { control, setValue } = useFormContext();
  const registerNumber = useWatch({ control, name: 'registerNumber' });
  const [expand, setExpand] = useState(!!orderData.registerNumber);

  const [checkRegister, { loading }] = useLazyQuery(
    gql(queries.ordersCheckCompany),
    {
      onError(error) {
        toast.error(error.message);
      },
      onCompleted(data) {
        const { found, name } = (data || {}).ordersCheckCompany || {};
        if (found) {
          setValue('companyName', name);
        }
      },
    }
  );

  useEffect(() => {
    setValue('companyName', '');
    if ((registerNumber || '').length > 6) {
      checkRegister({ variables: { registerNumber } });
    }
  }, [registerNumber]);

  return (
    <div
      className={clsx(
        '-ebarimt rounded col-12 my-3 relative',
        expand && 'expand'
      )}
    >
      <label className="col-12 flex items-center p-3 ">
        <Input
          type="checkbox"
          className="inline"
          onChange={() => {
            setExpand((prev) => !prev);
          }}
          checked={expand}
        />
        <small>
          <b className="ps-2 text-blue">И-Баримт албан байгууллагаар авах</b>
        </small>
      </label>
      {expand && (
        <div className="row px-2 ">
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Байгууллагын регистрийн дугаар"
              placeholder="Байгууллагын регистрийн дугаар"
              name="registerNumber"
            />
          </div>
          <div className="col-md-6 col-12 px-2 -disabled">
            <FormItem
              label="Байгууллагын нэр"
              placeholder="Байгууллагын нэр"
              name="companyName"
              disabled
            />
          </div>
          {loading && (
            <div className="-load flex items-center justify-center inset-0">
              <LoadingDots />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ebarimt;

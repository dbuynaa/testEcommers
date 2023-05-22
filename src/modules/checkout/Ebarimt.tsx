import { gql, useLazyQuery } from '@apollo/client';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import Checkbox from 'ui/Checkbox';
import { queries } from './graphql';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import FormItem from 'ui/FormItem';
import LoadingDots from 'ui/LoadingDots';
import { motion, AnimatePresence } from 'framer-motion';

const Ebarimt = () => {
  const { control, setValue } = useFormContext();

  const isCompany = useWatch({ control, name: 'isCompany' });
  const registerNumber = useWatch({ control, name: 'registerNumber' });

  const [checkRegister, { loading }] = useLazyQuery(
    gql(queries.ordersCheckCompany),
    {
      onError(error) {
        toast.error(error.message);
      },
      onCompleted(data) {
        const { found, name } = (data || {}).ordersCheckCompany || {};
        if (found) {
          setValue('companyName', name || 'Demo company');
        }
      },
    }
  );

  useEffect(() => {
    setValue('companyName', '');
    if ((registerNumber || '').length > 6) {
      checkRegister({ variables: { registerNumber } });
    }
  }, [checkRegister, registerNumber, setValue]);

  return (
    <div className="order-ebarimt">
      <Controller
        name="isCompany"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <label
            htmlFor="isCompany"
            className="order-ebarimt-company flex items-center"
          >
            <Checkbox
              checked={field.value}
              onCheckedChange={(isChecked) => field.onChange(isChecked)}
              id="isCompany"
            />
            <span className="ps-3">И-Баримт албан байгууллагаар авах</span>
          </label>
        )}
      />
      <AnimatePresence>
        {isCompany && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="px-2 row order-ebarimt-form"
          >
            <div className="col-12 col-md-6 px-2">
              <FormItem
                label="Байгууллагын регистрийн дугаар"
                name="registerNumber"
                placeholder="Байгууллагын регистрийн дугаар"
              />
            </div>
            <div className="col-12 col-md-6 px-2 -disabled">
              <FormItem
                label="Байгууллагын нэр"
                name="companyName"
                placeholder="Байгууллагын нэр"
                disabled
              />
              {loading && (
                <div className="-load flex items-center justify-center inset-0">
                  <LoadingDots />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Ebarimt;

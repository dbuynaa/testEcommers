import FormItem from 'ui/FormItem';
import Map from './map';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

const AddAddress = () => {
  const { control } = useFormContext();
  const deliveryInfo = useWatch({ name: 'deliveryInfo' });

  return (
    <AnimatePresence>
      {deliveryInfo == 'add' && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="row mx--2 address-add"
        >
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн нэр"
              placeholder="Бат-эрдэнэ"
              name="firstName"
            />
          </div>
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн Овог"
              placeholder="Хашбат"
              name="lastName"
            />
          </div>
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн утасны дугаар"
              placeholder="99999999"
              name="phone"
            />
          </div>
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн и-мэйл хаяг"
              placeholder="example@example.com"
              name="email"
            />
          </div>
          <div className="col-md-4 col-12 px-2">
            <FormItem label="Хот/Aймаг" placeholder="Улаанбаатар" name="city" />
          </div>
          <div className="col-md-4 col-12 px-2">
            <FormItem
              label="Дүүрэг/сум"
              placeholder="Баянгол"
              name="city_district"
            />
          </div>
          <div className="col-md-4 col-12 px-2">
            <FormItem label="Хороо/баг" placeholder="6-хороо" name="street" />
          </div>
          <div className="col-12 px-2">
            <FormItem
              label="Дэлгэрэнгүй хаяг"
              placeholder="Алтан өргөө цогцолбор, Наран ундраа төв"
              element="textarea"
              name="others"
            />
          </div>
          <div className="form-item col-12">
            <Controller
              name="marker"
              control={control}
              rules={{ required: true }}
              defaultValue={{
                lat: 47.92123,
                lng: 106.918556,
              }}
              render={({ field }) => (
                <>
                  <label className="block px-2 required" htmlFor="marker">
                    Газрын зураг
                  </label>
                  <Map
                    latLong={field.value}
                    setLatLong={(value) => field.onChange(value)}
                  />
                </>
              )}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
// latLong={latLong} setLatLong={setLatLong}

export default AddAddress;

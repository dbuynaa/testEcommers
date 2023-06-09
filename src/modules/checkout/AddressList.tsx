import RadioGroup, { Radio } from 'ui/RadioGroup';
import { Controller, useFormContext } from 'react-hook-form';

const AddressList = ({ addresses }: { addresses }) => {
  const { control } = useFormContext();
  return (
    <div className="py-3">
      <Controller
        name="deliveryInfo"
        control={control}
        defaultValue={'add'}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <label className="required">Хүргүүлэх хаяг сонгоно уу</label>
            <RadioGroup
              value={field.value}
              onValueChange={(val) => field.onChange(val)}
            >
              <label htmlFor="skip" className="address-item row items-center">
                <Radio value="skip" id="skip" />
                <span className="ms-2">Алгасах
                 <span className='ms-2 text-[10px]'>Та сонгосон бүтээгдэхүүнээ өөрийн биеэр очиж авахаар бол </span></span>
              </label>
              {(addresses || []).map((address, idx) => (
                <label
                  htmlFor={address?.id}
                  className="address-item flex items-center"
                  key={idx}
                >
                  <Radio value={address?.id} id={address?.id} />
                  <span className="ms-2">{address?.short}</span>
                </label>
              ))}

              <label htmlFor="add" className="address-item row items-center">
                <Radio value="add" id="add" />
                <span className="ms-2">Шинэ хаяг үүсгэх</span>
              </label>
            </RadioGroup>
          </>
        )}
      />
    </div>
  );
};

// deliveryInfo: {
//   ...rest,
//   marker: latLong,
//   description: `Аймаг/Хот: ${data.province},  Сум/Дүүрэг: ${data.district}, Баг/Хороо: ${data.street}, Дэлгэрэнгүй: ${data.details} `,
// },

export default AddressList;

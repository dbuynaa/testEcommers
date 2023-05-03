import { useAddressType } from 'modules/checkout/AddressContext';
import Checkbox from 'ui/Checkbox';
import clsx from 'clsx';

const AddressItem = ({ children, value }) => {
  const { addressType, setAddressType } = useAddressType();

  return (
    <div
      key={value}
      className={clsx(
        'address-item row items-center',
        addressType === value && '-checked'
      )}
      onClick={() => setAddressType(value)}
    >
      <Checkbox
        type="button"
        className="me-2"
        checked={addressType === value}
        onCheckedChange={() => setAddressType(value)}
      />
      {children}
    </div>
  );
};

export default AddressItem;

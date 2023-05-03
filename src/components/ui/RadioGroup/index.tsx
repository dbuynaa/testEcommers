import {
  RadioGroupItemProps,
  RadioGroupProps,
  Root,
  Item,
  Indicator,
} from '@radix-ui/react-radio-group';
import clsx from 'clsx';

const RadioGroup = ({
  className,
  label,
  ...rest
}: RadioGroupProps & { label?: string }) => {
  return (
    <Root
      className={clsx('radiogroup-root', className)}
      aria-label={label}
      {...rest}
    />
  );
};

export const Radio = ({
  className,
  children,
  ...rest
}: RadioGroupItemProps) => (
  <Item {...rest} className={clsx('radiogroup-item', className)}>
    <Indicator className="radiogroup-indicator" />
    {children}
  </Item>
);

export default RadioGroup;

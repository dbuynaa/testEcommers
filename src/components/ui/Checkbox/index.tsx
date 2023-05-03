import { Root, Indicator, CheckboxProps } from '@radix-ui/react-checkbox';
import Check from 'icons/Check';
import clsx from 'clsx';

const Checkbox = ({className, ...props}: CheckboxProps) => {
  return (
    <Root className={clsx("checkbox-root", className)} {...props}>
      <Indicator className="checkbox-indicator">
        <Check />
      </Indicator>
    </Root>
  );
};

export default Checkbox;

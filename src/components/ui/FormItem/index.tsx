'use client';
import { FC, forwardRef } from 'react';
import Input, { InputProps } from 'ui/Input';
import clsx from 'clsx';

export interface FormItemProps extends InputProps {
  label?: string;
  labelClassName?: string;
  errors: any;
  errorMsgs?: any;
}

// eslint-disable-next-line react/display-name
const FormItem: FC<FormItemProps> = forwardRef((props, inputRef) => {
  const { name, label, errors, errorMsgs, labelClassName, className, ...rest } =
    props;

  const error = errors[name || ''];

  return (
    <div className={clsx('form-item', { error: error?.type })}>
      <label htmlFor={name} className={clsx('ps-2', labelClassName)}>
        {label}
      </label>
      <Input
        name={name}
        pure
        ref={inputRef}
        {...rest}
        className={clsx(className)}
      />
      {error?.type && (
        <small className="block text-danger ps-2">
          {errorMsgs[error.type]}
        </small>
      )}
    </div>
  );
});

export default FormItem;

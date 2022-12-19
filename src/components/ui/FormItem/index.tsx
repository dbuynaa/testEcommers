'use client';
import { FC } from 'react';
import Input, { InputProps } from 'ui/Input';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

export interface FormItemProps extends InputProps {
  label?: string;
  labelClassName?: string;
  errorMsgs?: any;
  element?: 'textarea';
  onBlur?: any;
  validate?: object;
}

// eslint-disable-next-line react/display-name
const FormItem: FC<FormItemProps> = (props) => {
  const {
    name,
    label,
    labelClassName,
    className,
    element,
    pure,
    placeholder,
    required = true,
    errorMsgs,
    validate,
    ...rest
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name || ''];
  const errorMessages = {
    ...(errorMsgs || {}),
    required: 'Заавал оруулана уу',
  };

  const inputProps = {
    className,
    placeholder,
    ...register(name || '', { ...validate, required }),
  };

  const renderInput = () => {
    if (element === 'textarea') return <textarea {...inputProps} />;
    return <Input pure {...inputProps} {...rest} />;
  };
  //
  return (
    <div className={clsx('form-item', { error: error?.type })}>
      <label htmlFor={name} className={clsx('ps-2', labelClassName)}>
        {label}
      </label>
      {renderInput()}
      {error?.type && (
        <small className="block text-danger ps-2">
          {errorMessages[error.type as any]}
        </small>
      )}
    </div>
  );
};

export default FormItem;

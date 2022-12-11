'use client';
import { FC, forwardRef } from 'react';
import Input, { InputProps } from 'ui/Input';
import clsx from 'clsx';
import { mergeRefs } from 'react-merge-refs';

export interface FormItemProps extends InputProps {
  label?: string;
  labelClassName?: string;
  errors: any;
  errorMsgs?: any;
  element?: 'textarea';
  onBlur?: any;
}

// eslint-disable-next-line react/display-name
const FormItem: FC<FormItemProps> = forwardRef((props, inputRef) => {
  const {
    name,
    label,
    errors,
    errorMsgs,
    labelClassName,
    className,
    element,
    pure,
    onBlur,
    onChange,
    placeholder,
    ...rest
  } = props;

  const error = errors[name || ''];

  const renderInput = () => {
    if (element === 'textarea')
      return (
        <textarea
          name={name}
          ref={mergeRefs([inputRef])}
          className={clsx(className)}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
        />
      );
    return (
      <Input
        name={name}
        pure
        ref={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
        className={clsx(className)}
      />
    );
  };

  return (
    <div className={clsx('form-item', { error: error?.type })}>
      <label htmlFor={name} className={clsx('ps-2', labelClassName)}>
        {label}
      </label>
      {renderInput()}
      {error?.type && (
        <small className="block text-danger ps-2">
          {errorMsgs[error.type]}
        </small>
      )}
    </div>
  );
});

export default FormItem;

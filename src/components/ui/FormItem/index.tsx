
import { FC, useState, ReactNode } from 'react';
import Input, { InputProps } from 'ui/Input';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import Button from 'ui/Button';
import Eye from 'icons/Eye';
import EyeSlash from 'icons/EyeSlash';

export interface FormItemProps extends InputProps {
  label?: string | ReactNode;
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
    type,
    ...rest
  } = props;

  const [inputType, setInputType] = useState(type);

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
    return <Input pure {...inputProps} {...rest} type={inputType} />;
  };

  //
  return (
    <div
      className={clsx('form-item', {
        'checkbox-holder': type === 'checkbox',
      })}
    >
      <label htmlFor={name} className={clsx(labelClassName, { required })}>
        {label}
      </label>
      <div className="relative">
        {renderInput()}
        {type === 'password' && (
          <Button
            className="-pass"
            variant="ghost"
            type="button"
            onClick={() =>
              setInputType((prev) =>
                prev === 'password' ? 'text' : 'password'
              )
            }
          >
            {inputType === 'password' ? <EyeSlash /> : <Eye />}
          </Button>
        )}
      </div>
      {type !== 'checkbox' && error?.type && (
        <p className="block text-danger">{errorMessages[error.type as any]}</p>
      )}
    </div>
  );
};

export default FormItem;

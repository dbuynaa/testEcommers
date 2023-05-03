/* eslint-disable react-hooks/exhaustive-deps */

import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { FormHTMLAttributes, ReactNode, useEffect } from 'react';

type IForm = {
  children: ReactNode;
  args?: FieldValues;
  onSubmit: (values: any) => void;
  reset?: boolean;
} & FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, args, onSubmit, reset, ...rest }: IForm) => {
  const methods = useForm(args);

  useEffect(() => {
    reset && methods.reset();
  }, [reset]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;

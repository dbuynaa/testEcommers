/* eslint-disable react-hooks/exhaustive-deps */

import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { FormHTMLAttributes, ReactNode, useEffect } from 'react';

type IForm = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  args?: FieldValues;
  handleSubmit: (values: any) => void;
  reset?: boolean;
};

const Form = ({ children, args, handleSubmit, reset, ...rest }: IForm) => {
  const methods = useForm(args);

  useEffect(() => {
    reset && methods.reset();
  }, [reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;

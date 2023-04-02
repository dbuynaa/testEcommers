/* eslint-disable react-hooks/exhaustive-deps */

import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { ReactNode, useEffect } from 'react';

type IForm = {
  children: ReactNode;
  args?: FieldValues;
  onSubmit: (values: any) => void;
  reset?: boolean;
};

const Form = ({ children, args, onSubmit, reset }: IForm) => {
  const methods = useForm(args);

  useEffect(() => {
    reset && methods.reset();
  }, [reset]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;

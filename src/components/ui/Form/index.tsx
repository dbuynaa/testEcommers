'use client';
import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import type { ReactNode } from 'react';

type IForm = {
  children: ReactNode;
  args: FieldValues;
  onSubmit: (values: any) => void;
};

const Form = ({ children, args, onSubmit }: IForm) => {
  const methods = useForm(args);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;

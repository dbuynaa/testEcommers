'use client';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import Button from 'ui/Button';
import { useForm } from 'react-hook-form';
import FormItem from 'ui/FormItem';

type FormData = {
  password: string;
  login: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const login = useMutation();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <h5 className="text-blue pb-3 text-center">Нэвтрэнэ үү</h5>
      <FormItem
        label="Hэвтрэх нэр"
        placeholder="Утасны дугаар эсвэл имэйл"
        errorMsgs={{
          pattern: ' Зөв утасны дугаар эсвэл имэйл оруулана уу',
          required: 'Заавал оруулана уу',
        }}
        errors={errors}
        {...register('login', {
          required: true,
          pattern: /^(.+@.+|\d{8})$/,
        })}
      />
      <FormItem
        label="Нууц үг"
        placeholder="Нууц үг"
        type="password"
        labelClassName="mt-2"
        errorMsgs={{
          required: 'Заавал оруулана уу',
        }}
        errors={errors}
        {...register('password', {
          required: true,
        })}
      />

      <Button className="p-3 mt-3" type="submit">
        Нэвтрэх
      </Button>

      <small className="text-center py-3 block text-blue">Эсвэл</small>

      <Button
        variant="slim"
        className="p-3"
        Component={Link}
        href="/auth/register"
      >
        Бүртгүүлэх
      </Button>
    </form>
  );
};

export default Login;

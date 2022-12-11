'use client';
import { useMutation } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from 'ui/Button';
import { useForm } from 'react-hook-form';
import FormItem from 'ui/FormItem';
import { mutations, queries } from 'modules/auth/graphql';
import { toast } from 'react-toastify';

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const [login, { loading }] = useMutation(mutations.login, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onCompleted() {
      return from ? router.push(from) : router.push('/');
    },
    onError(error) {
      return toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) =>
    login({
      variables: { ...data, clientPortalId: process.env.NEXT_PUBLIC_CP_ID },
    })
  );

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

      <Button className="p-3 mt-3" type="submit" loading={loading}>
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

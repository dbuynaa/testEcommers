'use client';
import { useMutation } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from 'ui/Button';
import { useForm, FormProvider } from 'react-hook-form';
import FormItem from 'ui/FormItem';
import { mutations, queries } from 'modules/auth/graphql';
import { toast } from 'react-toastify';

type FormData = {
  password: string;
  login: string;
};

const Login = () => {
  const methods = useForm<FormData>();
  const router = useRouter();

  const [login, { loading }] = useMutation(mutations.login, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onError(error) {
      return toast.error(error.message);
    },
  });

  const onSubmit = methods.handleSubmit((data) =>
    login({
      variables: { ...data, clientPortalId: process.env.NEXT_PUBLIC_CP_ID },
    })
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <h5 className="text-blue pb-3 text-center">Нэвтрэнэ үү</h5>
        <FormItem
          label="Hэвтрэх нэр"
          placeholder="Утасны дугаар эсвэл имэйл"
          errorMsgs={{
            pattern: ' Зөв утасны дугаар эсвэл имэйл оруулана уу',
          }}
          validate={{
            pattern: /^(.+@.+|\d{8})$/,
          }}
          name="login"
        />
        <FormItem
          label="Нууц үг"
          placeholder="Нууц үг"
          type="password"
          labelClassName="mt-2"
          name="password"
        />

        <p className="text-right">
          <Link href={'/auth/forgot-password'} className="text-blue">
            Та нууц үгээ мартсан уу?
          </Link>
        </p>

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
    </FormProvider>
  );
};

export default Login;

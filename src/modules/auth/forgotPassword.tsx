import Button from 'ui/Button';
import { useForm, FormProvider } from 'react-hook-form';
import FormItem from 'ui/FormItem';
import { useMutation } from '@apollo/client';
import { mutations } from 'modules/auth/graphql';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const methods = useForm<FormData>();
  const router = useRouter();

  const [forgotPassword, { loading }] = useMutation(mutations.forgotPassword, {
    onError(error) {
      return toast.error(error.message);
    },
    onCompleted(data) {
      if (data) {
        toast.success('Taны имэйл хаяг руу имэйл сэргээх холбоос илгээлээ');
        return router.push('/auth/login');
      }
    },
  });

  const onSubmit = methods.handleSubmit((data) =>
    forgotPassword({
      variables: { ...data, clientPortalId: process.env.NEXT_PUBLIC_CP_ID },
    })
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <h5 className="text-blue pb-3 text-center">Нууц үг сэргээх</h5>
        <FormItem
          label="Имэйл"
          placeholder="example@techstore.mn"
          errorMsgs={{
            pattern: ' Зөв имэйл оруулана уу',
          }}
          validate={{
            pattern: /^(.+@.+)$/,
          }}
          name="email"
        />
        <Button className="p-3 mt-3" type="submit" loading={loading}>
          Нууц үг сэргээх
        </Button>

        <small className="text-center py-3 block text-blue">Эсвэл</small>

        <Button
          variant="slim"
          className="p-3"
          Component={Link}
          href="/auth/login"
        >
          Нэвтрэх
        </Button>
      </form>
    </FormProvider>
  );
};

export default ForgotPassword;

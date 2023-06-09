import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'ui/Button';
import { useForm, FormProvider } from 'react-hook-form';
import FormItem from 'ui/FormItem';
import { mutations, queries } from 'modules/auth/graphql';
import { toast } from 'react-toastify';
import { validatePassword,validatePhone } from 'utils/constants';

type FormData = {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};

const Signup = () => {
  const methods = useForm<FormData>();

  const router = useRouter();
  const { from } = router.query;

  const [createUser, { loading }] = useMutation(mutations.createUser, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onCompleted() {
      toast.success('Таны имэйл рүү баталгаажуулах холбоос илгээлээ.');
      return from ? router.push(from + '') : router.push('/');
    },
    onError(error) {
      return toast.error(error.message);
    },
  });

  const onSubmit = methods.handleSubmit((data) =>
    createUser({
      variables: { ...data, clientPortalId: process.env.NEXT_PUBLIC_CP_ID },
    })
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <h5 className="text-blue pb-3 text-center">Бүртгүүлэх</h5>
        <FormItem
          label="Нэр"
          placeholder="Нэр"
          errorMsgs={{
            required: 'Заавал оруулана уу',
          }}
          name="firstName"
        />
        <FormItem
          label="Овог"
          placeholder="Овог"
          errorMsgs={{
            required: 'Заавал оруулана уу',
          }}
          name="lastName"
        />
        <FormItem
          label="Имэйл"
          placeholder="example@example.com"
          errorMsgs={{
            required: 'Заавал оруулана уу',
            pattern: 'Зөв имэйл оруулана уу',
          }}
          name="email"
          validate={{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
        />
        <FormItem
          label="Утас"
          placeholder="Утасны дугаар"
          errorMsgs={{
            pattern: 'Зөв утасны дугаар оруулана уу',
          }}
          name="phone"
          validate={{ pattern:validatePhone}}
        />
        <FormItem
          label="Нууц үг"
          placeholder="Нууц үг"
          type="password"
          labelClassName="mt-2"
          errorMsgs={{
            pattern:
              'Дор хаяж нэг тоо, нэг том жижиг үсэг, дор хаяж 8 ба түүнээс дээш тэмдэгт агуулсан байх ёстой',
          }}
          validate={{
            pattern: validatePassword,
          }}
          name="password"
        />
        <FormItem
          type="checkbox"
          label={
            <>
              Би <Link href="/terms-of-service">Үйлчилгээний нөхцөлийг</Link>{' '}
              уншиж танилцан зөвшөөрч байна.
            </>
          }
          name="privacy"
        />

        <Button className="p-3 mt-3" type="submit" loading={loading}>
          Бүртгүүлэх
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

export default Signup;

import { useMutation } from "@apollo/client";
import Link from "next/link";
import Button from "ui/Button";
import { useForm, FormProvider } from "react-hook-form";
import FormItem from "ui/FormItem";
import { mutations, queries } from "modules/auth/graphql";
import { toast } from "react-toastify";
import FbLogin from "./FbLogin";
import GoogleAuth from "./GoogleAuth";

type FormData = {
  password: string;
  login: string;
};

const Login = () => {
  const methods = useForm<FormData>();

  const [login, { loading }] = useMutation(mutations.login, {
    refetchQueries: [{ query: queries.currentUser }, "clientPortalCurrentUser"],
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
        <h5 className="text-blue pb-3 text-center">Нэвтэрнэ үү</h5>
        <FormItem
          label="Hэвтрэх нэр"
          placeholder="Утасны дугаар эсвэл имэйл"
          errorMsgs={{
            pattern: " Зөв утасны дугаар эсвэл имэйл оруулана уу",
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
          name="password"
        />

        <p className="text-right forgot-password mb-1">
          <Link href={"/auth/forgot-password"} className="text-blue">
            Та нууц үгээ мартсан уу?
          </Link>
        </p>

        <Button className="mt-2 login-btn" type="submit" loading={loading}>
          Нэвтрэх
        </Button>
        <p className="text-center p-2 register-link ">
          Шинэ хэрэглэгч болох
          <Link href={"/auth/register"} className="text-blue px-2 ">
            Бүртгүүлэх
          </Link>
        </p>
        <p className="text-center or py-2">Эсвэл</p>
        <FbLogin />
        <GoogleAuth />
      </form>
    </FormProvider>
  );
};

export default Login;

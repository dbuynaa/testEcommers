import Layout from 'components/profile/layout';
import InfoLayout from 'components/profile/InfoLayout';
import Form from 'ui/Form';
import FormItem from 'ui/FormItem';
import { useCurrentUser } from 'modules/appContext';
import Button from 'ui/Button';
import { useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/auth/graphql';
import { toast } from 'react-toastify';
import Avatar from 'modules/auth/Avatar';

const Info = () => {
  const { currentUser } = useCurrentUser();

  const [editUser, { loading }] = useMutation(mutations.userEdit, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onCompleted(data) {
      console.log('fdsa', data);
      toast.success('Амжилттай солигдлоо');
    },
    onError(error) {
      toast.error(error.message);
    }
  });

  const args = {
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      phone: currentUser?.phone,
      avatar: currentUser?.avatar,
    }
  };

  const onSubmit = (value: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
  }) => editUser({ variables: { ...value, _id: currentUser?._id } });

  return (
    <div className="flex flex-wrap md:flex-nowrap">
      <div className="w-full flex  flex-col items-center md:w-3/12 pt-5">
        <Avatar />
        <span className="text-blue mt-3">Зураг Өөрчлөх</span>
      </div>
      <Form handleSubmit={onSubmit} args={args}>
        <div className="row py-3 px-md-2">
          <div className="col-12 col-md-6 px-md-2">
            <FormItem name="firstName" label="Нэр" />
          </div>
          <div className="col-12 col-md-6 px-md-2">
            <FormItem name="lastName" label="Oвог" />
          </div>
          <div className="col-12 col-md-6 px-md-2">
            <FormItem name="email" label="И-мэйл хаяг" />
          </div>
          <div className="col-12 col-md-6 px-md-2">
            <FormItem name="phone" label="Утасны дугаар" />
          </div>

          <div className="col-6 col-md-9"></div>
          <div className="col-6 col-md-3">
            <Button
              className="w-100 py-3 bg-blue"
              type="submit"
              loading={loading}
            >
              Өөрчлөх
            </Button>
          </div>
        </div>
        <div></div>
      </Form>
    </div>
  );
};

Info.getLayout = (page) => (
  <Layout>
    <InfoLayout>{page}</InfoLayout>
  </Layout>
);

export default Info;

'use client';

import Form from 'ui/Form';
import FormItem from 'ui/FormItem';
import { useCurrentUser } from 'modules/appContext';
import Button from 'ui/Button';
import { useMutation } from '@apollo/client';
import { mutations, queries } from 'modules/auth/graphql';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ChangePassword = () => {
  const { currentUser } = useCurrentUser();
  const [reset, setReset] = useState<boolean>(false);

  const [changePassword, { loading }] = useMutation(
    mutations.userChangePassword,
    {
      refetchQueries: [
        { query: queries.currentUser },
        'clientPortalCurrentUser',
      ],
      onCompleted() {
        setReset(true);
        toast.success('Амжилттай солигдлоо');
      },
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const args = {
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
    },
  };

  const onSubmit = (value: {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
  }) => {
    const { newPassword, passwordConfirm } = value;

    if (newPassword === passwordConfirm) {
      return changePassword({ variables: { ...value, _id: currentUser?._id } });
    }
    toast.error('Нууц үг таарахгүй байна');
  };
  return (
    <Form onSubmit={onSubmit} args={args} reset={reset}>
      <div className="row py-3 px-2">
        <div className="col-6 px-2">
          <FormItem
            name="currentPassword"
            label="Oдоогийн нууц үг"
            type="password"
            placeholder="*******"
          />
        </div>
        <div className="col-6"></div>
        <div className="col-6 px-2">
          <FormItem
            name="newPassword"
            label="Шинэ нууц үг"
            placeholder="*******"
            type="password"
          />
        </div>
        <div className="col-6 px-2">
          <FormItem
            name="passwordConfirm"
            label="Шинэ нууц үг баталгаажуулах"
            placeholder="*******"
            type="password"
          />
        </div>
        <div className="col-9"></div>
        <div className="col-3">
          <Button
            className="w-100 py-3 bg-blue"
            type="submit"
            loading={loading}
          >
            Шинэчлэх
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ChangePassword;

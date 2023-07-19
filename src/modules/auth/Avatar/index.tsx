import { useCurrentUser } from 'modules/appContext';
import { useState } from 'react';
import Image from 'ui/Image';

import Modal from 'ui/Modal';
import { useMutation } from '@apollo/client';
import { mutations, queries } from '../graphql';
import AvatarUpload from './AvatarUpload';


const Avatar = () => {
  const { currentUser } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState('');

  const [changeAvatar] = useMutation(mutations.userEdit, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser']
  });

  const onAvatarUpload = (response) => {
    changeAvatar({
      variables: {
        avatar: response,
        _id: currentUser?._id
      }
    });
  };
  console.log('fdsgsdfg', currentUser?.avatar);
  return (
    <>
      <div
        className="overflow-hidden rounded-full "
        onClick={() => setOpen(true)}
      >
        <Image
          className="h-24 w-24 rounded-full object-contain"
          height={80}
          width={80}
          src={currentUser?.avatar || '/images/user.png'}
          alt="avatar"
        />
      </div>
      <Modal
        contentClassName="storepay-modal"
        open={open}
        onOpenChange={() => setOpen((prev) => !prev)}
      >
        <AvatarUpload onCancel={()=>setOpen(false)} onSave={onAvatarUpload} />
      </Modal>
    </>
  );
};

export default Avatar;

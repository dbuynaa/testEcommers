import { useCurrentUser } from 'modules/appContext';
import { useState } from 'react';
import Image from 'ui/Image';
import Modal from 'ui/Modal';
import AvatarUpload from './AvatarUpload';

const Avatar = () => {
  const { currentUser } = useCurrentUser();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="overflow-hidden rounded-full w-24 h-24 "
        onClick={() => setOpen(true)}
      >
        <Image
          className="w-full h-full"
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
        <AvatarUpload />
      </Modal>
    </>
  );
};

export default Avatar;

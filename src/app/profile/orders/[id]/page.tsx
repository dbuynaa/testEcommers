import ArrowLeft from 'icons/ArrowLeft';
import Button from 'ui/Button';
import Link from 'next/link';

const Page = () => {
  return (
    <Button
      variant="ghost"
      Component={Link}
      className="profile-back"
      riffle={false}
      href="/profile/orders"
    >
      <ArrowLeft className="me-3" />
      Миний захиалгууд
    </Button>
  );
};

export default Page;

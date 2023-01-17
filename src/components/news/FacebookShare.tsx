import Facebook from 'icons/Facebook';
import Button from 'ui/Button';

const FacebookShare = ({ title, id }: any) => {
  return (
    <Button
      className="-facebook share"
      variant="slim"
      Component="a"
      data-service="facebook"
      data-url={`${process.env.NEXT_PUBLIC_URL}/news/${id}`}
      data-title={title}
    >
      <Facebook />
    </Button>
  );
};

export default FacebookShare;

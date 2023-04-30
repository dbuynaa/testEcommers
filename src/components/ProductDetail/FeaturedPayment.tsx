import Button from 'ui/Button';
import Image from 'ui/Image';
import ChevronRight from 'icons/ChevronRight';

const FeaturedPayment = ({ name, image, description, ...rest }) => {
  return (
    <div className="ft-payment pt-3">
      <Button variant="slim" {...rest}>
        <Image height={42} width={42} src={image} alt={name} />
        <div className="ps-2 -content">
          <div>{name}</div>
          <small>{description}</small>
        </div>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default FeaturedPayment;

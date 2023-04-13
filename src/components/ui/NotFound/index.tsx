import Link from 'next/link';
import Image from 'ui/Image';
import Button from 'ui/Button';

const NotFound = ({ statusCode }: { statusCode: number }) => {
  return (
    <div className="error-page">
      <div className="error-content">
        <div className="img-wrap">
          <Image src="/images/404.png" alt="404" />
        </div>
        <h3>Page not found</h3>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        <Link href="/">
          <Button>Нүүрлүү буцах</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

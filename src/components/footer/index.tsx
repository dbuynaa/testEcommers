import Mail from 'icons/Mail';
import Link from 'next/link';
import Image from 'ui/Image';
import Button from 'ui/Button';
import Phone from 'icons/ThinPhone';
import Marker from 'icons/Marker';
import { use } from 'react';
import { getFooter } from 'lib/wp/page';

const Footer = () => {
  const { page } = use(getFooter());

  const { phone, mail, map } = page?.contact || {};

  return (
    <footer>
      <div className="-content py-md-4 relative">
        {page?.featuredImage?.sourceUrl && (
          <Image
            sizes="100vw"
            src={page?.featuredImage?.sourceUrl || ''}
            alt="techstore footer"
          />
        )}
        <div className="container c-xl py-5 relative">
          <div className="row">
            <div className="col-12 col-md-4 pb-3">
              <Link href="/news">Мэдээ мэдээлэл</Link>
              <Link href="/terms-of-service">Үйлчилгээний нөхцөл</Link>
              <Link href="/privacy-policy">Нууцлалын бодлого</Link>
            </div>
            <div className="col-12 col-md-4">
              <Link href={'mailto: ' + mail} className="flex items-center">
                <Button variant="naked" className="text-blue me-3">
                  <Mail />
                </Button>
                <span>{mail}</span>
              </Link>
              <Link href={'tel: ' + phone} className="flex items-center pb-3">
                <Button variant="naked" className="text-blue me-3">
                  <Phone />
                </Button>
                <span>{(phone || '').split('').join('')}</span>
              </Link>
            </div>
            <div className="col-12 col-md-4">
              <Link
                className="flex items-start"
                href={map || ''}
                target="_blank"
              >
                <Button variant="naked" className="text-blue me-3">
                  <Marker />
                </Button>
                <div
                  dangerouslySetInnerHTML={{ __html: page?.content || '' }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="-author container c-xl row justify-end p-3">
        Бүх эрх хуулиар хамгаалагдсан © {new Date().getFullYear()}.
        <b className="ps-1">Techstore - Технологийн дэлгүүр</b>
      </div>
    </footer>
  );
};

export default Footer;

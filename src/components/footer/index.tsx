import Mail from 'icons/Mail';
import Link from 'next/link';
import Image from 'ui/Image';
import Button from 'ui/Button';
import Phone from 'icons/ThinPhone';
import Marker from 'icons/Marker';
import Facebook from 'icons/Facebook';
import Instagram from '../icons/Instagram';

const Footer = ({ footer }: any) => {
  const { phone, mail, map, facebook, instagram } = footer?.contact || {};

  return (
    <footer>
      <div className="-content py-md-4 relative">
        {footer?.featuredImage?.sourceUrl && (
          <Image
            sizes="100vw"
            src={footer?.featuredImage?.sourceUrl || ''}
            alt="techstore footer"
          />
        )}
        <div className="container c-xl py-5 relative">
          <div className="row">
            <div className="col-12 col-md-4 pb-3">
              <Link href="/about">Бидний тухай</Link>
              <Link href="/terms-of-service">Үйлчилгээний нөхцөл</Link>
              <Link
                href="https://www.zangia.mn/company/JC-electronics"
                target="_blank"
              >
                Ажлын байр
              </Link>
              <Link href="/branches">Салбарууд</Link>
            </div>
            <div className="col-12 col-md-4">
              <Link href={'mailto: ' + mail} className="flex items-center">
                <Button variant="naked" className="text-blue me-3">
                  <Mail />
                </Button>
                <span>{mail}</span>
              </Link>
              <Link href={'tel: ' + phone} className="flex items-center ">
                <Button variant="naked" className="text-blue me-3">
                  <Phone />
                </Button>
                <span>{(phone || '').split('').join('')}</span>
              </Link>
              <Link
                href={facebook}
                className="flex items-center"
                target="_blank"
              >
                <Button variant="naked" className="text-blue me-3">
                  <Facebook />
                </Button>
                <span>TechStore</span>
              </Link>
              <Link
                href={instagram}
                className="flex items-center pb-3"
                target="_blank"
              >
                <Button variant="naked" className="text-blue me-3">
                  <Instagram />
                </Button>
                <span>@techstoremongolia</span>
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
                  dangerouslySetInnerHTML={{ __html: footer?.content || '' }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="-author container c-xl row justify-between p-3">
        Бүх эрх хуулиар хамгаалагдсан © {new Date().getFullYear()}
        <span>Techstore - Технологийн дэлгүүр</span>
      </div>
    </footer>
  );
};

export default Footer;

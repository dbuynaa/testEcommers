import Mail from 'icons/Mail';
import Link from 'next/link';
import Image from 'ui/Image';
import Button from 'ui/Button';
import Phone from 'icons/ThinPhone';
import Marker from 'icons/Marker';
import Facebook from 'icons/Facebook';
import Instagram from '../icons/Instagram';
import { useRouter } from 'next/router';
import { isBlank } from 'utils';
import clsx from 'clsx';

const FooterTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <b className={clsx('footer-title sbt block', className)}>{children}</b>;

const Col = ({
  children,
  title,
  titleClass = 'pb-4',
}: {
  children: React.ReactNode;
  title: string;
  titleClass?: string;
}) => (
  <div className="col-12 col-md-3 pb-3">
    <FooterTitle className={titleClass}>{title}</FooterTitle>
    {children}
  </div>
);

const FooterLink = ({
  href,
  children,
  icon,
}: {
  href: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  if (icon && !children)
    return (
      <Button
        variant="naked"
        className="text-blue me-3"
        href={href}
        Component={Link}
        target="_blank"
      >
        {icon}
      </Button>
    );

  if (icon)
    return (
      <Link
        href={href}
        target={isBlank(href)}
        className="flex items-center mb-2 sbt"
      >
        <Button variant="naked" className="text-blue me-2">
          {icon}
        </Button>
        <span>{children}</span>
      </Link>
    );

  return (
    <Link href={href} target={isBlank(href)} className="sbt pb-2 mb-1">
      {children}
    </Link>
  );
};

const Footer = ({ footer }: any) => {
  const { phone, mail, map, facebook, instagram } = footer?.contact || {};
  const router = useRouter();

  if (router.asPath.includes('auth') || router.asPath.includes('checkout'))
    return null;

  return (
    <footer>
      <div className="-content relative">
        {/* {footer?.featuredImage?.sourceUrl && (
          <Image
            sizes="100vw"
            src={footer?.featuredImage?.sourceUrl || ''}
            alt="techstore footer"
          />
        )} */}
        <div className="container pt-5 pb-3 relative">
          <div className="row">
            <Col title="Бидний тухай">
              <FooterLink href="/about">Бидний тухай</FooterLink>

              <FooterLink href="https://www.zangia.mn/company/JC-electronics">
                Ажлын байр
              </FooterLink>
              <FooterLink href="/branches">Салбарууд</FooterLink>
            </Col>
            <Col title="ТУСЛАМЖ">
              <FooterLink href="/terms-of-service">
                Үйлчилгээний нөхцөл
              </FooterLink>
              <FooterLink href="/terms-of-service">
                Нууцлалын бодлого
              </FooterLink>
            </Col>
            <Col titleClass="pb-3" title="ХОЛБОО БАРИХ">
              <FooterLink href={'mailto: ' + mail} icon={<Mail />}>
                {mail}
              </FooterLink>
              <FooterLink href={'tel: ' + phone} icon={<Phone />}>
                {(phone || '').toString()}
              </FooterLink>
              <FooterTitle className="py-3 mb-1">БИДНИЙГ ДАГААРАЙ</FooterTitle>
              <div className="flex items-center pb-2">
                <FooterLink href={facebook} icon={<Facebook />} />
                <FooterLink href={instagram} icon={<Instagram />} />
              </div>
            </Col>
            <Col title="ХАЯГ" titleClass="pb-3">
              <FooterLink href={map || ''} icon={<Marker />}>
                <div
                  dangerouslySetInnerHTML={{ __html: footer?.content || '' }}
                />
              </FooterLink>
              <div className="pt-1"></div>
              <FooterTitle className="pt-4 pb-3">ЦАГИЙН ХУВААРЬ</FooterTitle>
              <div className="sbt">
                Даваа-Баасан: 09:00-20:00
                <br /> Бямба-Ням: 10:00-18:00
              </div>
            </Col>
          </div>
        </div>
      </div>
      <div className="-author container row justify-between p-2">
        Бүх эрх хуулиар хамгаалагдсан © {new Date().getFullYear()}
        <span>Techstore - Технологийн дэлгүүр</span>
      </div>
    </footer>
  );
};

export default Footer;

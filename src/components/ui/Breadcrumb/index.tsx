import Link from 'next/link';

export const BreadcrumbItem = ({ href, children }: any) => {
  if (href)
    return (
      <li className="breadcrumb-item">
        <Link href={href}>{children}</Link>
      </li>
    );

  return <li className="breadcrumb-item">children</li>;
};

const Breadcrumb = ({ children }: any) => {
  return (
    <div className="py-4">
      <ol className="breadcrumb">{children}</ol>
    </div>
  );
};

export default Breadcrumb;

import NotFound from 'ui/NotFound';

function Error({ statusCode }: { statusCode: number }) {
  return <NotFound statusCode={statusCode} />;
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

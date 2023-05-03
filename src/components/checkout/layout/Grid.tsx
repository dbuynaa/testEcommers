import ScrollWrapper from 'components/header/Wrapper';
import Summary from '../summary';

const Grid = ({
  children,
  side,
}: {
  children: React.ReactNode;
  side?: React.ReactNode;
}) => {
  return (
    <div className="row">
      <div className="col-md-8 col-12 mb-3">{children}</div>
      <div className="col-md-4 col-12">{side}</div>
    </div>
  );
};

export default Grid;

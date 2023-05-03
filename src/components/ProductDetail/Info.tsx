import { formatCurrency } from 'utils';
import Actions from './Actions';
import { useDetailContext } from './Context';
import FeaturedPayments from './FeaturedPayments';
const Info = () => {
  const { name, code, unitPrice, remainder, description } = useDetailContext();
  return (
    <div className="col-12 col-md-6 px-md-5 prDtl-actions">
      <h5>{name}</h5>
      <div className="sbt text-mid-gray pb-3">Бүтээгдэхүүний код: {code}</div>
      <h4>{formatCurrency(unitPrice)}</h4>
      <div className="-count text-mid-gray">
        <b>{remainder || 0}</b> ширхэг бэлэн байна
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="pt-4 prDtl-description"
      />
      <FeaturedPayments />
      <Actions />
    </div>
  );
};

export default Info;

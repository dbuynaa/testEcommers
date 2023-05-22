import { useQuery } from '@apollo/client';
import { useDetailContext } from 'components/ProductDetail/Context';
import { queries } from './graphql';
import Button from 'ui/Button';

const Choose = () => {
  const codes = ['memory', 'color'];
  const { category, ...rest } = useDetailContext();

  const { meta, _id } = category || {};

  const { data, loading } = useQuery(queries.productDetailWithCustomFields, {
    variables: { categoryId: category._id },
    fetchPolicy: 'network-only',
    skip: meta !== 'group' || !_id,
  });

  if (loading) return <div>Loading...</div>;

  const fields = (data || {}).poscProducts || [];

  const properties = convertDataToProperties(fields);

  console.log(properties, 'pros');

  return (
    <div>
      {Object.keys(properties).map((property: string) => (
        <div key={property}>
          <b className="block">
            {rest?.properties[property]?.text} songoh:
            <Button>{rest?.properties[property]?.value}</Button>
          </b>
        </div>
      ))}
    </div>
  );
};

export default Choose;

// convert data to properties
const convertDataToProperties = (data) => {
  const properties = {};
  data
    .map((item) => item?.customFieldsDataByFieldCode)
    .forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!properties[key]) {
          properties[key] = [];
        }
        if (item[key].value) {
          properties[key].push(item[key].value);
        }
      });
    });
  return properties;
};

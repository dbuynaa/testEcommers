import { useRouter } from 'next/router';
import Video from './Video';
import ProductsSlider from 'modules/Products/Slider';
import { useDetailContext } from './Context';
import { cloudflareLoader } from 'ui/Image';

const PropertyItem = ({ text, value }: any) => (
  <p className="flex prDtl-property justify-between sbt pb-2 mb-1">
    <b className="-text">{text}:</b>
    <span className="-value text-right">{value}</span>
  </p>
);

const getFlattenValue = (values: any) => {
  const result = {};
  for (let i = 0; i < values.length; i++) {
    result[values[i].text] = values[i];
  }
  return Object.values(result);
};

const Description = () => {
  const router = useRouter();

  const { categoryId, description, properties } = useDetailContext();

  const values = Object.values(properties || {});
  const keys = Object.keys(properties || {});
  const filter = ['intro', 'video'];

  const intro = properties?.intro?.value;
  const video = properties?.video?.value;

  const filteredValues = getFlattenValue(values).filter(
    (item: any, idx) =>
      !filter.includes(keys[idx]) && !!(item?.value || '').trim()
  );

  const odd = filteredValues.filter(
    (item: any, index: number) => index % 2 === 0
  );
  const even = filteredValues.filter(
    (item: any, index: number) => index % 2 !== 0
  );

  const modifiedDescription = description.replace(
    /<img/g,
    '<img loading="lazy"'
  );

  const colClass = 'col-12 col-md-6 px-md-3 px-2';

  return (
    <div className="prDtl-overview py-3 py-md-4 container text-blue">
      {intro && (
        <div className="prDtl-overview-intro mb-4">
          <p className="bold mb-2">Бүтээгдэхүүний танилцуулга</p>
          <div className="pb-4 sbt">{intro}</div>
        </div>
      )}
      {!!filteredValues.length && (
        <>
          <p className="bold mb-3">Гол үзүүлэлт</p>
          <div className="row prDtl-properties">
            <div className={colClass}>
              {odd?.map((item: any) => (
                <PropertyItem key={item?.text} {...item} />
              ))}
            </div>
            <div className={colClass}>
              {even?.map((item: any) => (
                <PropertyItem key={item?.text} {...item} />
              ))}
            </div>
          </div>
        </>
      )}
      {video && (
        <div className="my-4">
          <Video src={video} />
        </div>
      )}
      <ProductsSlider
        category={categoryId}
        slidesToShow={4}
        except={[router.query.id?.toString() || '']}
        head={<p className="my-3 bold">Танд санал болгох бүтээгдэхүүн</p>}
      />
      {description && (
        <div
          dangerouslySetInnerHTML={{ __html: modifiedDescription }}
          className="pt-4 promotion"
        ></div>
      )}
    </div>
  );
};

const replaceImageSources = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const imgTags = doc.getElementsByTagName('img');
  for (let i = 0; i < imgTags.length; i++) {
    imgTags[i].setAttribute(
      'src',
      cloudflareLoader({
        src: imgTags[i].getAttribute('src'),
        width: 1400,
      })
    );
  }

  const updatedHtml = doc.documentElement.innerHTML;
  return updatedHtml;
};

export default Description;

import { useRouter } from 'next/router';
import Video from './Video';
import ProductsSlider from 'modules/Products/Slider';

const Description = ({ wp, categoryId }: { wp: any; categoryId: string }) => {
  const router = useRouter();
  const { content, productInfo } = wp || {};

  const { youtubeUrl, description } = productInfo || {};

  return (
    <div className="prDtl-overview text-blue py-4 container">
      <big className="pb-2 block">
        <b>Бүтээгдэхүүний танилцуулга</b>
      </big>
      <big className="py-3 sbt d-block">{description}</big>
      <div className="my-4">
        <Video src={youtubeUrl} />
      </div>
      <ProductsSlider
        category={categoryId}
        slidesToShow={4}
        except={[router.query.id?.toString() || '']}
        head={
          <div className="mb-3">
            <b>Ижил төстэй бүтээгдэхүүн:</b>
          </div>
        }
      />
      {content && (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="pt-5 promotion"
        ></div>
      )}
    </div>
  );
};

export default Description;

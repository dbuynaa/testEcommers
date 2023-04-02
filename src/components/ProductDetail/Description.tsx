import Video from './Video';
import ProductsSlider from 'modules/Products/Slider';

const Description = ({ wp, categoryId }: { wp: any; categoryId: string }) => {
  const { content, productInfo } = wp || {};

  const { youtubeUrl, description } = productInfo || {};

  return (
    <div className="prDtl-overview text-blue py-4 container">
      <h6 className="pb-2">
        <b>Бүтээгдэхүүний танилцуулга</b>
      </h6>
      <big className="py-3 sbt d-block">{description}</big>
      <div className="row my-5">
        <div className="col-12 col-md-6 pe-md-2">
          <div className="mb-3">
            <b>Онцлох видео:</b>
          </div>
          <Video src={youtubeUrl} />
        </div>
        <div className="col-12 col-md-6 pt-4 pt-md-0">
          <div className="mb-3 ps-md-2">
            <b>Ижил төстэй бүтээгдэхүүн:</b>
          </div>
          <ProductsSlider category={categoryId} slidesToShow={2} />
        </div>
      </div>
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

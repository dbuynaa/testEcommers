import { use } from 'react';
import { getProductInfo } from 'lib/wp/posts';
import Video from './Video';

const Description = ({
  _id,
  categoryId,
}: {
  _id: string;
  categoryId: string;
}) => {
  const { post } = use(getProductInfo((_id || '').toLowerCase()));

  const { content, productInfo } = post || {};

  const { youtubeUrl } = productInfo || {};

  return (
    <div className="prDtl-overview text-blue py-4">
      <h6 className="pb-2">
        <b>Бүтээгдэхүүний танилцуулга</b>
      </h6>
      <big className="py-3 sbt d-block">
        Дундаж үнэтэй утаснуудын хамгийн алдартай нь буюу Redmi брэндийн
        утаснуудын энэ оны загвар болох note11 загвар. Хүний энгийн хэрэглээг
        бүгдийг хангасан, хамгийн сүүлийн үеийн технологийг ашигласан боломжийн
        үнэтэй утас.
      </big>
      <div className="row my-5 row-stretch">
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <b>Онцлох видео:</b>
          </div>
          <Video src={youtubeUrl} />
        </div>
      </div>
      {/* <Row className="my-5 row-stretch" gutter={24}>
        <Col lg={12}>
          <Video />
        </Col>
        <Col lg={12}>
          <SimilarProducts />
        </Col>
      </Row>
      <Image src={bottom_image} alt="hi" />
      <Image src={bottom_image} alt="hi" />
      <Image src={bottom_image} alt="hi" /> */}
      {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
    </div>
  );
};

export default Description;

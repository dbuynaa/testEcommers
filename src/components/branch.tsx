import Image from 'ui/Image';
import Address from 'icons/Address';
import Route from 'icons/Route';
import Calling from 'icons/Calling';

const Branch = ({ title, branchInfo, content, featuredImage }) => {
  return (
    <div className="row branch">
      <div className="col-12 col-md-3 ">
        <div className="img-wrap">
          <Image alt="" src={(featuredImage || {}).sourceUrl} />
        </div>
      </div>
      <div className="col-12 col-md-6 branch-content p-3">
        <h6>
          <b>{title}</b>
        </h6>
        <p className="branch-desc">
          <Address />
          {branchInfo?.address}
        </p>
        <p className="branch-desc">
          <Route />
          {branchInfo?.more}
        </p>
        <p className="branch-desc">
          <Calling />
          {branchInfo?.phone}
        </p>
      </div>
      <div
        className="col-12 col-md-3 branch-timetable"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Branch;

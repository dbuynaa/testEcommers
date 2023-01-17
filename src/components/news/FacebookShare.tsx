import Facebook from 'icons/Facebook';
import Button from 'ui/Button';
import Script from 'next/script';

const FacebookShare = ({ title, id }: any) => {
  return (
    <>
      <div id="fb-root"></div>
      <Button
        className="-facebook share fb-share-button"
        variant="slim"
        Component="div"
        data-service="facebook"
        data-href={`${process.env.NEXT_PUBLIC_URL}/news/${id}`}
        data-title={title}
        data-layout="button_count"
      >
        <Facebook />
      </Button>
      <Script
        id="facebook-share"
        dangerouslySetInnerHTML={{
          __html: `(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'))`,
        }}
      />
    </>
  );
};

export default FacebookShare;

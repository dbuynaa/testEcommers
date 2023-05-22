import { useCurrentOrder } from 'modules/appContext';
import { useItems } from 'modules/contextHooks';
import Link from 'next/link';
import LottieView from 'ui/Lottie';

const Checkpage = ({ children }: { children: React.ReactNode }) => {
  const cart = useItems();
  const { loadingCurrentOrder } = useCurrentOrder();

  if (!cart.length && !loadingCurrentOrder)
    return (
      <div className="my-5 py-3 cart-empty">
        <LottieView
          path="https://assets2.lottiefiles.com/packages/lf20_ry4iluja.json"
          className="-empty"
        />
        <h5 className="my-3">Таны сагс хоосон байна</h5>
        <Link href="/" className="btn slim">
          Нүүр хуудас
        </Link>
      </div>
    );

  return <>{children}</>;
};

export default Checkpage;

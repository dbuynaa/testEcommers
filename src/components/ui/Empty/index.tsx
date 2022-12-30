import Robot from 'icons/Robot';

const Empty = ({
  size,
  message = 'Хоосон байна',
}: {
  size?: string;
  message?: string;
}) => {
  return (
    <div className="text-center p-5">
      <Robot size={size} />
      <small className="text-mid-gray block pt-3">{message}</small>
    </div>
  );
};

export default Empty;

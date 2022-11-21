import Robot from 'icons/Robot';

const Empty = ({ size }: { size: string }) => {
  return (
    <div className="text-center p-5">
      <Robot size={size} />
      <small className="text-mid-gray block pt-3">Хоосон байна</small>
    </div>
  );
};

export default Empty;

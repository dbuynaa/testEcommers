import LoadingDots from 'ui/LoadingDots';
import clsx from 'clsx';

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={clsx('flex items-center justify-center loading', className)}
    >
      <LoadingDots />
    </div>
  );
}

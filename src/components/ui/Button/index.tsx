'use client';
import React, {
  forwardRef,
  ButtonHTMLAttributes,
  JSXElementConstructor,
  useRef,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import clsx from 'clsx';
import LoadingDots from 'ui/LoadingDots';
import Ink from 'react-ink';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: 'flat' | 'slim' | 'ghost' | 'naked';
  active?: boolean;
  type?: 'submit' | 'reset' | 'button';
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
  riffle?: boolean;
}
// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    riffle = true,
    Component = 'button',
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = clsx(
    'btn',
    { [variant]: variant, '-loading': loading, disabled: disabled || loading },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled || loading}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="ps-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
      {riffle && !disabled && <Ink duration={700} />}
    </Component>
  );
});

export default Button;

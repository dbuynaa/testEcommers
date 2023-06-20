import { FC, InputHTMLAttributes, useRef, forwardRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (...args: any[]) => any;
  pure?: boolean;
  ref?: any;
}
// eslint-disable-next-line react/display-name
const Input: FC<InputProps> = forwardRef((props, inputRef) => {
  const ref = useRef(null);
  const { className, children, onChange, pure, ...rest } = props;

  const handleOnChange = (e: any) => {
    if (onChange) {
      pure ? onChange(e) : onChange(e.target.value);
    }
    return null;
  };

  return (
    <input
      className={className}
      onChange={handleOnChange}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      ref={mergeRefs([ref, inputRef])}
      {...rest}
    />
  );
});

export default Input;

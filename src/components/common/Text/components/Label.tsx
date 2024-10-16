import { TextComponentProps } from '../Text.interface';

const Label = ({ children, className }: TextComponentProps) => {
  return (
    <label
      className={`text-sm font-medium leading-tight text-slate-700 ${className}`}
      translate="no"
    >
      {children}
    </label>
  );
};

export default Label;

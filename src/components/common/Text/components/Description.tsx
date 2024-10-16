import { TextComponentProps } from '../Text.interface';

const Description = ({ children, className }: TextComponentProps) => {
  return (
    <div
      className={`text-xs font-normal leading-4 text-slate-600 ${className}`}
      translate="no"
    >
      {children}
    </div>
  );
};

export default Description;

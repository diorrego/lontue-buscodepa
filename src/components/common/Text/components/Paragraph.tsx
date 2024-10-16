import { TextComponentProps } from '../Text.interface';

const Paragraph = ({ children, className }: TextComponentProps) => {
  return (
    <p
      className={`text-base font-normal leading-normal text-slate-600 ${className}`}
      translate="no"
    >
      {children}
    </p>
  );
};

export default Paragraph;

import { TextComponentProps } from '../Text.interface';

const SectionTitle = ({ children, className }: TextComponentProps) => {
  return (
    <h4
      className={`text-lg font-semibold leading-7 ${className}`}
      translate="no"
    >
      {children}
    </h4>
  );
};

export default SectionTitle;

import { TextComponentProps } from '../Text.interface';

const Subtitle = ({ children, className }: TextComponentProps) => {
  return (
    <h3
      className={`text-xl font-semibold leading-8 ${className}`}
      translate="no"
    >
      {children}
    </h3>
  );
};

export default Subtitle;

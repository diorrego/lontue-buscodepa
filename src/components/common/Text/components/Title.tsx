import { TextComponentProps } from '../Text.interface';

const Title = ({ children, className }: TextComponentProps) => {
  return (
    <h2
      className={`text-3xl font-semibold leading-9 ${className}`}
      translate="no"
    >
      {children}
    </h2>
  );
};

export default Title;

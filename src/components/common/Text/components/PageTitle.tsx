import { TextComponentProps } from '../Text.interface';

const PageTitle = ({ children, className }: TextComponentProps) => {
  return (
    <h1
      className={`text-5xl font-semibold leading-10 ${className}`}
      translate="no"
    >
      {children}
    </h1>
  );
};

export default PageTitle;

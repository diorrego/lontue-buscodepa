import { TextAreaProps } from '../interfaces/TextArea.interface';

const TextArea = ({ className, type = 'text', ...props }: TextAreaProps) => {
  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const classes = `
    h-44
    md:h-24
    border
    border-gray-300
    rounded-lg
    px-3.5
    py-2.5
    focus:outline-2
    focus:outline-teal-700
    focus:bg-gray-100
    placeholder:text-gray-600
    transition-all
    duration-300
    focus:text-gray-700
    text-base
    font-medium
    bg-gray-300
    
  `;

  return (
    <textarea
      className={classes + className}
      data-testid="textarea"
      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => autoResize(e)}
      {...props}
    />
  );
};

export default TextArea;

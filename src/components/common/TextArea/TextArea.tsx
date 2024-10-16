import { TextAreaProps } from '../interfaces/TextArea.interface';

const TextArea = ({ className, type = 'text', ...props }: TextAreaProps) => {
  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const classes = `
    h-full
    border
    border-neutral-500
    rounded
    px-2
    focus:outline-2
    focus:outline-indigo-600
    placeholder:text-neutral-600
    transition-all
    duration-300
    focus:text-neutral-700
    dark:text-neutral-600
    dark:bg-neutral-800
    dark:focus:bg-neutral-50
    
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

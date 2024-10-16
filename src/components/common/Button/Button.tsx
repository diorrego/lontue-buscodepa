import { ButtonProps } from './Button.interface';

const Button = ({
  children,
  className,
  disabled,
  type = 'button',
  variant,
  disabledMinWidth,
  onClick,
}: ButtonProps) => {
  const classes = `
    rounded-lg
    h-12
    ${!disabledMinWidth && 'min-w-[196px]'}
    transition-all
    flex
    justify-center
    px-4
    py-2.5
    ${
      disabled
        ? 'bg-neutral-500 text-white'
        : !variant &&
          'bg-teal-400 text-teal-950 hover:bg-teal-700 hover:text-teal-200'
    }
    ${
      variant === 'secondary' &&
      !disabled &&
      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-200'
    }
    ${
      variant === 'danger' &&
      !disabled &&
      'bg-red-500 text-white hover:bg-red-700'
    }
  `;

  return (
    <button
      className={classes + className}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      <div className="text-base font-semibold font-['Montserrat'] leading-normal flex items-center justify-center h-full">
        {children}
      </div>
    </button>
  );
};

export default Button;

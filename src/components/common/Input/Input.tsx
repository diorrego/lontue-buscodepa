import { useState } from 'react';
import { InputProps } from './Input.interface';

const Input = ({ className, type = 'text', icon, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const classes = `
    h-12
    w-full
    border
    border-gray-300
    rounded-lg
    ${icon ? 'pl-12 pr-3.5' : 'px-3.5'}
    py-2.5
    focus:outline-2
    focus:outline-teal-700
    placeholder:text-gray-600
    transition-all
    duration-300
    focus:text-gray-700
    text-base
    font-medium
    bg-gray-300
  `;

  return (
    <div className="relative text-gray-700 w-full">
      {icon && (
        <div
          className={`absolute h-full flex items-center p-3.5 ${
            isFocused && 'text-teal-700'
          }`}
        >
          {icon}
        </div>
      )}
      <input
        className={classes + className}
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
};

export default Input;

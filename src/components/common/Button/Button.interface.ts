import { MouseEvent } from 'react';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode; // this prop is for the button label, preferably it should be a string.
  disabled?: boolean;
  variant?: 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?:
    | (() => void)
    | ((event: MouseEvent<HTMLButtonElement>) => void)
    | undefined;
  disabledMinWidth?: boolean;
}

export interface UploadImageInputProps {
  file: File | undefined | null;
  setFile: Function;
  className: string;
  src?: string | undefined | void;
}

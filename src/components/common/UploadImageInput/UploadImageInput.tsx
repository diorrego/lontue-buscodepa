import {
  ChangeEvent,
  useRef,
  useEffect,
  useState,
  FormEvent,
  DragEvent,
} from 'react';
import { HiCloudUpload } from 'react-icons/hi';
import Image from 'next/image';

import Text from '../Text';
import { UploadImageInputProps } from './UploadImageInput.interface';

const UploadImageInput = ({
  file,
  setFile,
  className,
  src,
}: UploadImageInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(src || null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewSrc(URL.createObjectURL(selectedFile));
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleDrag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setPreviewSrc(URL.createObjectURL(droppedFile));
    }
  };

  useEffect(() => {
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
    } else {
      setPreviewSrc(src || null);
    }

    return () => {
      if (previewSrc) URL.revokeObjectURL(previewSrc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, src]);

  return (
    <form
      onDragEnter={handleDrag}
      className="relative w-52 h-52 rounded-lg border border-gray-300"
      onSubmit={(e) => e.preventDefault()}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      draggable={false}
    >
      {previewSrc ? (
        <Image
          src={previewSrc}
          alt={file?.name || 'Imagen actual'}
          className={className}
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className={`bg-gray-100 rounded-2xl ${className}`} />
      )}
      {!file && (
        <div
          className={`absolute inset-0 ${
            src ? 'bg-gray-100/75' : 'bg-gray-100'
          }  ${
            className.includes('w-28') ? 'rounded-full' : 'rounded-2xl'
          } w-full h-full z-10`}
        />
      )}
      <button
        className="absolute inset-0 w-full h-full flex flex-col space-y-3 items-center justify-center rounded-full px-2 z-20"
        type="submit"
        onClick={handleUploadClick}
      >
        {!file && (
          <>
            <div className="text-gray-600 bg-white p-2.5 rounded-lg shadow">
              <HiCloudUpload />
            </div>
            {!className.includes('w-28') && (
              <div>
                <Text variant="label">
                  <span
                    className={!dragActive ? 'text-teal-700 font-semibold' : ''}
                  >
                    Haga clic para cargar
                  </span>{' '}
                  <span
                    className={dragActive ? 'text-teal-700 font-semibold' : ''}
                  >
                    o arrastra y suelta una imagen
                  </span>
                </Text>
                <Text variant="description">PNG, JPG, JPEG</Text>
              </div>
            )}
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        name="file"
        id="upload-file"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </form>
  );
};

export default UploadImageInput;

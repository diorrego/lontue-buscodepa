import Image from 'next/image';

import { AvatarProps } from '../interfaces/Avatar.interface';
import { motion } from 'framer-motion';

const Avatar = ({
  avatar,
  label,
  dropShadow = false,
  className = 'w-8 h-8 sm:w-12 sm:h-12',
}: AvatarProps) => {
  const classes = {
    image: `
      flex 
      justify-center 
      items-center 
      w-full 
      h-full
      bg-white
      rounded-full 
      object-cover
    `,
    textContainer: `
      flex
      justify-center
      items-center
      w-full
      h-full
      bg-indigo-300
      rounded-full
      font-semibold
    `,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {avatar ? (
        <Image
          className={
            dropShadow ? 'drop-shadow ' + classes.image : classes.image
          }
          src={avatar}
          alt={label}
          unoptimized
          width={32}
          height={32}
        />
      ) : (
        <div
          className={
            dropShadow
              ? 'drop-shadow ' + classes.textContainer
              : classes.textContainer
          }
        >
          {label[0]?.toUpperCase()}
        </div>
      )}
    </motion.div>
  );
};

export default Avatar;

import { motion } from 'framer-motion';

import { ModalProps } from '../interfaces/Modal.interface';

const Modal = ({ onClose, children }: ModalProps) => {
  const closeModal = () => {
    onClose();
  };

  const classes = {
    modalContainer: `
      fixed 
      inset-0 
      bg-black/90 
      dark:bg-neutral-700/90 
      w-full 
      z-50
      flex 
      justify-center 
      items-center
    `,
    contentContainer: `
      relative 
      w-11/12 
      sm:w-fit 
      h-fit 
      bg-white 
      dark:bg-black 
      py-4 
      px-4 
      rounded-lg
    `,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={closeModal}
      className={classes.modalContainer}
      data-testid="modal-container"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classes.contentContainer}
        data-testid="content-container"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Modal;

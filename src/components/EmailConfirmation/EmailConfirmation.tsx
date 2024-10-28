import { motion } from 'framer-motion';

import Text from '../common/Text';

const EmailConfirmation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grow pt-24 md:pt-52 px-2 md:px-0 text-center mx-auto max-w-[40rem] pb-12"
    >
      <div className="flex flex-col space-y-12">
        <Text variant="title">
          ¡Tu correo electrónico fue confirmado con éxito!
        </Text>
        <Text>
          <span className="font-semibold">
            Mantente atento a tu correo electrónico:
          </span>{' '}
          Podríamos contactarte para pedirte más información o avisarte cuando
          el Depa perfecto esté disponible para ti.
        </Text>
      </div>
    </motion.div>
  );
};

export default EmailConfirmation;

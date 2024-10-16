import { useState, useEffect } from 'react';
import Image from 'next/image';
import Joi from 'joi';
import { HiUser } from 'react-icons/hi';
import { HiMail } from 'react-icons/hi';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';

import useSchemaValidator from '@/hooks/useSchemaValidator';
import { useFormContext } from '@/providers/FormProvider';
import { motion } from 'framer-motion';

const Hero = () => {
  const { email, setEmail, name, setName, setStep } = useFormContext();

  const [showEmailAlertModal, setShowEmailAlertModal] = useState(false);
  const [showNameAlertModal, setShowNameAlertModal] = useState(false);

  const emailSchema = Joi.string().email({ tlds: { allow: false } });
  const nameSchema = Joi.string();

  const emailIsValid = useSchemaValidator(emailSchema, email).isValid;
  const nameIsValid = useSchemaValidator(nameSchema, name).isValid;

  const searchButtonClickHandler = () => {
    setShowEmailAlertModal(false);
    setShowNameAlertModal(false);

    if (!emailIsValid || !nameIsValid) {
      !emailIsValid && setShowEmailAlertModal(true);
      !nameIsValid && setShowNameAlertModal(true);

      return;
    }

    setStep((prevState: number) => prevState + 1);
  };

  useEffect(() => {
    if (showNameAlertModal) {
      setTimeout(() => setShowNameAlertModal(false), 3000);
    }

    if (showEmailAlertModal) {
      setTimeout(() => setShowEmailAlertModal(false), 3000);
    }
  }, [showEmailAlertModal, showNameAlertModal]);

  return (
    <>
      <div>
        <div className="relative w-full h-[29rem] md:h-[38rem]">
          <div className="absolute inset-0 w-full h-full bg-black/70 z-10 overflow-x-hidden">
            <div className="max-w-6xl mx-auto pt-32 md:pt-52 flex flex-col space-y-2 px-2 md:px-0">
              <h1 className="text-4xl md:text-6xl text-white font-extrabold text-center text-balance leading-snug text-shadow">
                Arrienda el Depa ideal para ti sin complicaciones
              </h1>
              <h2 className="text-sm md:text-xl text-center font-semibold text-white mx-auto text-balance text-shadow">
                Déjanos tus datos, nuestro algoritmo hará el trabajo por ti. Te
                notificaremos cuando el departamento perfecto esté disponible.
              </h2>
            </div>
          </div>
          <Image
            src="/hero.webp"
            alt="Hero Image"
            fill={true}
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-x-0 -bottom-24 md:-bottom-12 w-11/12 md:max-w-6xl mx-auto bg-white md:h-24 z-20 rounded-lg shadow-lg shadow-black/40 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 py-4 md:py-0 md:space-x-4 px-4 md:px-10 overflow-x-hidden">
            <div className="w-full relative">
              <Input
                className="w-full"
                icon={<HiUser className="text-2xl" />}
                placeholder="Nombre completo"
                name="name"
                value={name}
                onChange={(e) => setName((e.target as HTMLInputElement).value)}
                autoComplete="name"
              />
              {showNameAlertModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-x-0 -bottom-5 mx-auto bg-red-700 w-fit px-1.5 py-1 rounded-lg z-40"
                >
                  <Text className="text-white font-semibold text-center z-40">
                    Nombre incorrecto
                  </Text>
                  <div className="absolute mx-auto inset-x-0 -top-0.5 rotate-45 h-2 w-2 bg-red-700 rounded-sm -z-10" />
                </motion.div>
              )}
            </div>
            <div className="w-full relative">
              <Input
                className="w-full"
                icon={<HiMail className="text-2xl" />}
                placeholder="Correo electrónico"
                value={email}
                name="email"
                onChange={(e) =>
                  setEmail(
                    (e.target as HTMLInputElement).value
                      .toLowerCase()
                      .replace(/\s+/g, '')
                  )
                }
                autoComplete="email"
              />
              {showEmailAlertModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-x-0 -bottom-5 mx-auto bg-red-700 w-fit px-1.5 py-1 rounded-lg z-40"
                >
                  <Text className="text-white font-semibold text-center z-40">
                    Correo electrónico incorrecto
                  </Text>
                  <div className="absolute mx-auto inset-x-0 -top-0.5 rotate-45 h-2 w-2 bg-red-700 rounded-sm -z-10" />
                </motion.div>
              )}
            </div>
            <Button
              className="w-full md:w-[30rem]"
              onClick={searchButtonClickHandler}
            >
              Busca tu Depa ideal
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-40 md:pt-32 flex flex-col space-y-10 pb-20">
        <h2 className="text-center text-3xl font-extrabold">¿Cómo funciona?</h2>
        <div className="flex flex-col md:flex-row items-start justify-between px-2 md:px-0 space-y-16 md:space-y-0 md:space-x-16">
          <div className="basis-1/3">
            <div className="bg-gray-400 text-white text-4xl font-extrabold flex items-center justify-center h-14 w-14 rounded-full">
              <p>1</p>
            </div>
            <Text variant="subtitle" className="mt-4 pl-5 text-balance">
              Inscríbete fácilmente completando un formulario con tus datos.
            </Text>
          </div>
          <div className="basis-1/3">
            <div className="bg-gray-400 text-white text-4xl font-extrabold flex items-center justify-center h-14 w-14 rounded-full">
              <p>2</p>
            </div>
            <Text variant="subtitle" className="mt-4 pl-5 text-balance">
              Te pediremos que respondas una breve pregunta y envíes una selfie
              con quienes vivirás.
            </Text>
          </div>
          <div className="basis-1/3">
            <div className="bg-gray-400 text-white text-4xl font-extrabold flex items-center justify-center h-14 w-14 rounded-full">
              <p>3</p>
            </div>
            <Text variant="subtitle" className="mt-4 pl-5 text-balance">
              Cuando nuestro algoritmo haga el match, listo, ya puedes arrendar
              el Depa
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

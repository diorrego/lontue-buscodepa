import { useState, useEffect } from 'react';
import Joi from 'joi';
import { HiLocationMarker } from 'react-icons/hi';
import { IoLogoWhatsapp } from 'react-icons/io';
import { motion } from 'framer-motion';

import Button from '../common/Button';
import Text from '../common/Text';
import Input from '../common/Input';

import useSchemaValidator from '@/hooks/useSchemaValidator';
import { useFormContext } from '@/providers/FormProvider';

const FirstPhase = () => {
  const { setStep } = useFormContext();

  const [phaseStep, setPhaseStep] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [budget, setBudget] = useState<number>(-1);
  const [location, setLocation] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');

  const budgets = [
    { a: '$200.000', b: '$250.000' },
    { a: '$260.000', b: '$300.000' },
    { a: '$310.000', b: '$350.000' },
    { a: '$360.000', b: '$400.000' },
    { a: '$410.000', b: '$450.000' },
    { a: '$460.000', b: '$500.000' },
    { a: '$510.000', b: '$550.000' },
    { c: '$560.000' },
  ];

  const locationSchema = Joi.string();
  const whatsappSchema = Joi.string().pattern(/^\d+$/).min(10).max(15);

  const locationIsValid = useSchemaValidator(locationSchema, location).isValid;
  const whatsappIsValid = useSchemaValidator(whatsappSchema, whatsapp).isValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedrooms(parseFloat(e.target.value));
  };

  const handleMouseUp = () => {
    const roundedBedrooms = Math.round(bedrooms);
    setBedrooms(roundedBedrooms);
  };

  const backToHome = () => {
    setStep(0);
  };

  const nextButtonClickHandler = () => {
    setPhaseStep((prevState) => prevState + 1);
  };

  const backButtonClickHandler = () => {
    setPhaseStep((prevState) => prevState - 1);
  };

  const budgetClickHandler = (budgetsIndex: number) => {
    setBudget(budgetsIndex);
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setWhatsapp(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phaseStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grow pt-24 md:pt-52 px-2 md:px-0 text-center mx-auto max-w-[40rem] pb-12"
    >
      {phaseStep === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-12"
        >
          <div className="flex flex-col space-y-2">
            <Text variant="title">
              ¿Cuántos dormitorios necesitas para tu Depa?
            </Text>
            <Text>
              Desplaza la barra para aumentar la cantidad de dormitorios.
            </Text>
          </div>
          <div>
            <Text variant="sectionTitle">
              {Math.round(bedrooms) !== 5
                ? `${Math.round(bedrooms)} ${
                    Math.round(bedrooms) === 1 ? 'dormitorio' : 'dormitorios'
                  }`
                : 'Más de 4 dormitorios'}
            </Text>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="0.01"
            value={bedrooms}
            onChange={handleChange}
            onMouseUp={handleMouseUp}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer custom-range"
            style={{
              accentColor: 'transparent',
              background: `linear-gradient(to right, #14b8a6 ${
                (Math.round(bedrooms) - 1) * 25
              }%, #d1d5db ${(Math.round(bedrooms) - 1) * 25}%)`,
            }}
          />
          <div className="flex flex-col-reverse md:flex-row md:space-x-4 w-full items-center justify-center">
            <Button
              variant="secondary"
              onClick={backToHome}
              className="w-full md:w-fit mt-4 md:mt-0"
            >
              Atrás
            </Button>
            <Button
              onClick={nextButtonClickHandler}
              className="w-full md:w-fit"
            >
              Siguiente
            </Button>
          </div>
        </motion.div>
      )}
      {phaseStep === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-12"
        >
          <div className="flex flex-col space-y-2">
            <Text variant="title">
              ¿Cuánto es el presupuesto de arriendo para tu Depa?
            </Text>
            <Text className={budget === -1 ? 'text-red-500' : ''}>
              Selecciona un rango de presupuesto.
            </Text>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {budgets.map((b, index) => (
              <div
                key={index}
                onClick={() => budgetClickHandler(index)}
                className={`w-32 h-24 rounded-lg ${
                  budget === index
                    ? 'border-2 border-teal-500 bg-teal-50'
                    : 'border border-gray-300 shadow-md'
                } flex items-center justify-start p-4 text-start cursor-pointer select-none transition-all`}
              >
                {b?.a ? (
                  <Text>
                    <span className="font-semibold text-md">{b.a}</span> a{' '}
                    <span className="font-semibold text-md">{b.b}</span>
                  </Text>
                ) : (
                  <Text>
                    Más de <span className="font-semibold text-md">{b.c}</span>
                  </Text>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col-reverse md:flex-row md:space-x-4 w-full items-center justify-center">
            <Button
              variant="secondary"
              onClick={backButtonClickHandler}
              className="w-full md:w-fit mt-4 md:mt-0"
            >
              Atrás
            </Button>
            <Button
              onClick={nextButtonClickHandler}
              className="w-full md:w-fit"
              disabled={budget === -1}
            >
              Siguiente
            </Button>
          </div>
        </motion.div>
      )}
      {phaseStep === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-12"
        >
          <div className="flex flex-col space-y-2">
            <Text variant="title">¿En qué ciudad y/o barrio buscas Depa?</Text>
            <Text>Pregunta opcional. Escribe la ciudad y/o el barrio.</Text>
          </div>
          <Input
            className="w-full"
            icon={<HiLocationMarker className="text-2xl" />}
            placeholder="Ej.: Concepción, Palomares"
            name="name"
            value={location}
            onChange={(e) => setLocation((e.target as HTMLInputElement).value)}
          />
          <div className="flex flex-col-reverse md:flex-row md:space-x-4 w-full items-center justify-center">
            <Button
              variant="secondary"
              onClick={backButtonClickHandler}
              className="w-full md:w-fit mt-4 md:mt-0"
            >
              Atrás
            </Button>
            <Button
              onClick={nextButtonClickHandler}
              className="w-full md:w-fit"
            >
              Siguiente
            </Button>
          </div>
        </motion.div>
      )}
      {phaseStep === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-12"
        >
          <Text variant="title">Por último, déjanos tu WhatsApp</Text>
          <div className="w-full flex flex-col space-y-2">
            <Input
              className="w-full"
              icon={
                <div className="flex flex-row item-center justify-center space-x-1">
                  <IoLogoWhatsapp className="text-2xl" />
                  <Text>+</Text>
                </div>
              }
              placeholder="56982341234"
              name="whatsapp"
              value={whatsapp}
              onChange={handleWhatsappChange}
            />
            <Text className="text-red-500 h-4">
              {!whatsappIsValid ? 'Ingrese un número válido de WhatsApp.' : ''}
            </Text>
          </div>
          <div className="flex flex-col-reverse md:flex-row md:space-x-4 w-full items-center justify-center">
            <Button
              variant="secondary"
              onClick={backButtonClickHandler}
              className="w-full md:w-fit mt-4 md:mt-0"
            >
              Atrás
            </Button>
            <Button
              onClick={nextButtonClickHandler}
              className="w-full md:w-fit"
              disabled={!whatsappIsValid}
            >
              Siguiente
            </Button>
          </div>
        </motion.div>
      )}
      {phaseStep === 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-12"
        >
          <Text variant="title">¡Gracias por inscribirte en buscoDepa.cl!</Text>
          <Text>
            Revisa tu correo electrónico para confirmar tu inscripción en
            nuestro sistema.
          </Text>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FirstPhase;

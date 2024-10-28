import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { HiLocationMarker } from 'react-icons/hi';
import Joi from 'joi';

import Button from '../common/Button';
import Text from '../common/Text';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import UploadImageInput from '../common/UploadImageInput';

import useSchemaValidator from '@/hooks/useSchemaValidator';

registerLocale('es', es);

const SecondPhase = () => {
  const [phaseStep, setPhaseStep] = useState(1);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File>();

  const locationSchema = Joi.string();
  const descriptionSchema = Joi.string();

  const locationIsValid = useSchemaValidator(locationSchema, location).isValid;
  const descriptionIsValid = useSchemaValidator(
    descriptionSchema,
    description
  ).isValid;

  const nextButtonClickHandler = () => {
    setPhaseStep((prevState) => prevState + 1);
  };

  const backButtonClickHandler = () => {
    setPhaseStep((prevState) => prevState - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phaseStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 md:pt-52 px-2 md:px-0 text-center mx-auto max-w-[40rem] pb-12"
    >
      {phaseStep === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-12"
        >
          <Text variant="title">Ingresa tu fecha de nacimiento</Text>
          <div className="flex flex-col space-y-2">
            <Text variant="label">
              Fecha de Nacimiento
              <span className="text-red-500">
                {!birthDate && ' (Ingresa una fecha)'}
              </span>
            </Text>
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              maxDate={new Date()}
              placeholderText="dd/mm/aaaa"
              locale="es"
              className="h-12 w-full border px-3.5 text-center border-gray-300 rounded-lg py-2.5 focus:outline-2 focus:outline-teal-700 focus:bg-gray-100 placeholder:text-gray-600 transition-all duration-300 focus:text-gray-700 text-base font-medium bg-gray-300"
            />
          </div>
          <Button
            disabled={!birthDate}
            onClick={nextButtonClickHandler}
            className="w-full md:w-fit"
          >
            Siguiente
          </Button>
        </motion.div>
      )}
      {phaseStep === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center space-y-12"
        >
          <div className="flex flex-col space-y-2">
            <Text variant="title">¿En qué comuna vives actualmente?</Text>
            <Text>
              <span
                className={!location || !locationIsValid ? 'text-red-500' : ''}
              >
                Escribe tu comunca de residencia actual.
              </span>
            </Text>
          </div>
          <Input
            className="w-full"
            icon={<HiLocationMarker className="text-2xl" />}
            placeholder="Ej.: Concepción"
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
              disabled={!location || !locationIsValid}
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
            <Text variant="title">
              Cuéntanos sobre ti y las razones para arrendar un Depa
            </Text>
            <Text>
              Describe tu ocupación, el tipo de contrato laboral, quiénes
              vivirán en el depa (familiares, amigos, pareja, niños, mascotas,
              etc.), y qué aspectos valoras en las instalaciones (piscina,
              estacionamiento, ubicación, gimnasio, áreas verdes, seguridad,
              etc.). Cuéntanos también por qué elegiste arrendar a través de
              buscoDepa.cl. Cuantos más detalles nos des, mejor podrá nuestro
              algoritmo encontrar el match perfecto para ti.
              {(!description || !descriptionIsValid) && (
                <span className="text-red-500">
                  {' '}
                  Debes escribir las razones.
                </span>
              )}
            </Text>
          </div>
          <TextArea
            className="w-full"
            placeholder="Ej.: Soy analista contable con contrato indefinido de $1.000.000 líquidos. Viviré con mi pareja y una perrita pequeña. Busco seguridad 24 horas. Me gusta de buscoDepa.cl que con pocos datos inicio el arriendo de un Depa..."
            name="name"
            value={description}
            onChange={(e) =>
              setDescription((e.target as HTMLInputElement).value)
            }
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
              disabled={!description || !descriptionIsValid}
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
          <div className="flex flex-col space-y-2">
            <Text variant="title">
              Sube una foto de todos con quienes vivirás en el depa
            </Text>
            <Text>
              Tómate una selfie o una foto junto a quienes vivirán contigo en el
              depa (familiares, amigos, mascotas, etc.).
              {!file && (
                <span className="text-red-500"> Debes subir una imagen.</span>
              )}
            </Text>
          </div>
          <UploadImageInput
            file={file}
            setFile={setFile}
            className="w-full h-full rounded-lg"
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
              disabled={!file}
            >
              Postula a tu Depa
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
          <Text variant="title">¡Gracias por postular en buscoDepa.cl!</Text>
          <Text>
            Nuestro algoritmo analizará tu caso y te escribiremos si encontramos
            el Depa perfecto para tí.
          </Text>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SecondPhase;

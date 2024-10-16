import { createContext, useContext, useState } from 'react';

export const FormContext = createContext({});

export const useFormContext = () => useContext<any>(FormContext);

const FormProvider = ({ children }: any) => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <FormContext.Provider
      value={{ email, setEmail, name, setName, step, setStep }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;

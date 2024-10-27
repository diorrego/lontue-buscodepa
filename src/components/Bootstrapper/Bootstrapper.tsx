import Hero from '@/components/Hero';
import { useFormContext } from '@/providers/FormProvider';
import FirstPhase from '../FirstPhase';

const Bootstrapper = () => {
  const { step } = useFormContext();

  return (
    <>
      {step === 0 && <Hero />}
      {step === 1 && <FirstPhase />}
    </>
  );
};

export default Bootstrapper;

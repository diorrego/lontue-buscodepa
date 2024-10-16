import Hero from '@/components/Hero';
import { useFormContext } from '@/providers/FormProvider';

const Bootstrapper = () => {
  const { step } = useFormContext();
  return (
    <>
      {step === 0 && <Hero />}
      {step === 1 && <div>nuevo paso</div>}
    </>
  );
};

export default Bootstrapper;

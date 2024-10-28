import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Hero from '@/components/Hero';
import FirstPhase from '../FirstPhase';
import EmailConfirmation from '../EmailConfirmation';
import SecondPhase from '../SecondPhase';

import { useFormContext } from '@/providers/FormProvider';

const Bootstrapper = () => {
  const router = useRouter();
  const { token, email, phase } = router.query;

  const { step, setStep } = useFormContext();

  useEffect(() => {
    if (token && email) setStep(3);
    else setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (phase === '2' && email) setStep(2);
    else setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <>
      {step === 0 && <Hero />}
      {step === 1 && <FirstPhase />}
      {step === 2 && <SecondPhase />}
      {step === 3 && <EmailConfirmation />}
    </>
  );
};

export default Bootstrapper;

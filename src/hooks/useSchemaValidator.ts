import { useState, useEffect } from 'react';

const useSchemaValidator = (schema: any, value: any) => {
  const [isValid, setIsValid] = useState(true);

  const { error } = schema.validate(value);

  useEffect(() => {
    if (!error) setIsValid(true);
    if (error) setIsValid(false);
  }, [value, schema, error]);

  return { isValid, error };
};

export default useSchemaValidator;
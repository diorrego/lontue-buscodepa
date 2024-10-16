import { useState, useEffect, useRef } from 'react';
import Joi from 'joi';

const useSchemaValidator = (schema: Joi.Schema, value: any) => {
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] =
    useState<Joi.ValidationError | null>(null);
  const previousValueRef = useRef<any>();
  const previousSchemaRef = useRef<Joi.Schema>();

  useEffect(() => {
    const validateSchema = () => {
      if (
        value === previousValueRef.current &&
        schema === previousSchemaRef.current
      ) {
        return;
      }

      const { error } = schema.validate(value, { abortEarly: false });

      if (
        error &&
        (!validationError || error.message !== validationError.message)
      ) {
        setIsValid(false);
        setValidationError(error);
      } else if (!error && (validationError || !isValid)) {
        setIsValid(true);
        setValidationError(null);
      }

      previousValueRef.current = value;
      previousSchemaRef.current = schema;
    };

    validateSchema();
  }, [value, schema, validationError, isValid]);

  return { isValid, error: validationError };
};

export default useSchemaValidator;

import { registerSchema, loginSchema, resendVerificationSchema } from '../schemas/authSchemas.js';

const registerValidation = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

const resendVerificationValidation = (req, res, next) => {
  const { error } = resendVerificationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }
  next();
};

export { registerValidation, loginValidation, resendVerificationValidation };
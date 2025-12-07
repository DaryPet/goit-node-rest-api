import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'missing required field email',
    'string.empty': 'missing required field email',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'missing required field password',
    'string.empty': 'missing required field password',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'missing required field email',
    'string.empty': 'missing required field email',
  }),
  password: Joi.string().required().messages({
    'any.required': 'missing required field password',
    'string.empty': 'missing required field password',
  }),
});

export const resendVerificationSchema = Joi.object({
  email: Joi.string().email().required().messages({
      'any.required': 'missing required field email', 
      'string.empty': 'missing required field email', 
  }),
});

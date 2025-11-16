import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required(),
}).messages({
  "any.required": "missing required {{#label}} field",
  "string.email": "email must be a valid email address",
  "string.min": "{{#label}} should have at least {{#limit}} characters",
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().min(7),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "Must have at least one field to update",
    "string.email": "email must be a valid email address",
    "string.min": "{{#label}} should have at least {{#limit}} characters",
  });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  "any.required": "missing field favorite",
});

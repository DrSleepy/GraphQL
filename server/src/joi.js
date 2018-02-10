import Joi from 'joi';

export const JoiEmail = Joi.string().email();

export const JoiAge = Joi.number()
  .min(18)
  .max(100);

export const JoiDisplayName = Joi.string()
  .min(3)
  .max(30)
  .alphanum();

export const JoiMongoId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}/) // regex is mongo object ID format. Needs checking
  .min(24)
  .max(24);

export const JoiPassword = Joi.string()
  .min(8)
  .max(30)
  .alphanum();

export const JoiUsername = Joi.string()
  .alphanum()
  .min(5)
  .max(30);

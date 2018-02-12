import Joi from 'joi';

export const JoiOptions = {
  escapeHtml: true,
  stripUnknown: true,
  abortEarly: false,
  language: {
    key: '{{label}} ',
    any: {
      empty: 'is required'
    }
  }
};

export const JoiEmail = Joi.string()
  .email()
  .label('Email');

export const JoiAge = Joi.number()
  .min(18)
  .max(100)
  .label('Age');

export const JoiDisplayName = Joi.string()
  .min(3)
  .max(15)
  .alphanum()
  .label('Display Name');

export const JoiMongoId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}/) // regex is mongo object ID format. Needs checking
  .min(24)
  .max(24)
  .label('MongoID');

export const JoiPassword = Joi.string()
  .min(8)
  .max(30)
  .alphanum()
  .label('Password');

export const JoiConfirmPassword = Joi.any()
  .valid(Joi.ref('password'))
  .label('Confirm Password')
  .options({
    language: {
      any: {
        allowOnly: 'does not match password'
      }
    }
  });

export const JoiUsername = Joi.string()
  .alphanum()
  .min(5)
  .max(30)
  .label('Username');

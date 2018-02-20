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
  .lowercase()
  .email()
  .max(40)
  .label('Email');

export const JoiMinimumAge = Joi.number()
  .min(18)
  .max(70)
  .label('Minimum Age')
  .options({
    language: {
      number: {
        min: 'must be 18 or older',
        max: 'must be 70 or younger'
      }
    }
  });

export const JoiMaximumAge = Joi.number()
  .min(18)
  .max(70)
  .greater(Joi.ref('minAge'))
  .label('Maximum Age')
  .options({
    language: {
      number: {
        min: 'must be 18 or older',
        max: 'must be 70 or younger',
        greater: 'must be older than Minimum Age, {{limit}}'
      }
    }
  });

export const JoiGender = Joi.string()
  .lowercase()
  .valid(['male', 'female'])
  .label('Gender')
  .options({
    language: {
      any: {
        allowOnly: 'may only be Male / Female'
      }
    }
  });

/* eslint function-paren-newline: ["error", "consistent"] */
export const JoiGenderPreference = Joi.array()
  .items(
    Joi.string()
      .lowercase()
      .valid('male', 'female')
  )
  .unique()
  .min(1)
  .max(2)
  .label('Gender')
  .options({
    language: {
      array: {
        min: 'must be at least of Male, Female or Both',
        includesRequiredUnknowns: 'may only be Male, Female or Both',
        includesRequiredKnowns: 'may only be Male, Female or Both',
        unique: 'may not hold duplicates'
      }
    }
  });

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
  .label('Password Confirmation')
  .options({
    language: {
      any: {
        allowOnly: 'does not match password'
      }
    }
  });

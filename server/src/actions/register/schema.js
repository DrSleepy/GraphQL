import Joi from 'joi';

import {
  JoiDisplayName,
  JoiAge,
  JoiEmail,
  JoiPassword,
  JoiConfirmPassword,
  JoiOptions
} from '../../joi';

export default args => {
  const newUserSchema = Joi.object().keys({
    displayName: JoiDisplayName.required(),
    age: JoiAge.required(),
    email: JoiEmail.required(),
    password: JoiPassword.required(),
    confirmPassword: JoiConfirmPassword.required()
  });

  return Joi.validate(args, newUserSchema, JoiOptions);
};

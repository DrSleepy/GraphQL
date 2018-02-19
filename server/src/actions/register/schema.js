import Joi from 'joi';

import { JoiEmail, JoiPassword, JoiConfirmPassword, JoiGender, JoiOptions } from '../../joi';

export default args => {
  const newUserSchema = Joi.object().keys({
    email: JoiEmail.required(),
    password: JoiPassword.required(),
    confirmPassword: JoiConfirmPassword.required(),
    gender: JoiGender.required()
  });

  return Joi.validate(args, newUserSchema, JoiOptions);
};

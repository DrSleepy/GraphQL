import Joi from 'joi';

import { JoiEmail, JoiPassword, JoiConfirmPassword, JoiOptions } from '../../joi';

export default args => {
  const newUserSchema = Joi.object().keys({
    email: JoiEmail.required(),
    password: JoiPassword.required(),
    confirmPassword: JoiConfirmPassword.required(),
    gender: Joi.string().valid(['Male', 'Female']) // TO VALIDATE LATER
  });

  return Joi.validate(args, newUserSchema, JoiOptions);
};

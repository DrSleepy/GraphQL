import Joi from 'joi';
import { JoiEmail, JoiOptions } from '../../joi';

export default args => {
  const loginSchema = Joi.object().keys({
    email: JoiEmail.required(),
    password: Joi.string()
      .required()
      .label('Password')
  });

  return Joi.validate(args, loginSchema, JoiOptions);
};

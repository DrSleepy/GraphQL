import Joi from 'joi';
import { JoiEmail } from '../../joi';

export default args => {
  const loginSchema = Joi.object().keys({
    email: JoiEmail.required(),
    password: Joi.string()
      .alphanum()
      .required()
  });

  return Joi.validate(args, loginSchema);
};

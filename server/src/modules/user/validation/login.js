import Joi from 'joi';
import { JoiEmail, JoiPassword } from '../../../joi';

export default args => {
  const loginSchema = Joi.object().keys({
    email: JoiEmail.required(),
    password: JoiPassword.required()
  });

  return Joi.validate(args, loginSchema);
};

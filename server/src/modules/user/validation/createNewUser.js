import Joi from 'joi';
import { JoiDisplayName, JoiAge, JoiEmail, JoiPassword } from '../../../joi';

export default args => {
  const newUserSchema = Joi.object().keys({
    displayName: JoiDisplayName.required(),
    age: JoiAge.required(),
    email: JoiEmail.required(),
    password: JoiPassword.required()
  });

  return Joi.validate(args, newUserSchema);
};

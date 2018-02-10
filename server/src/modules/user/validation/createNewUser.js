import Joi from 'joi';
import { JoiDisplayName, JoiAge } from '../../../joi';

export default args => {
  const newUserSchema = Joi.object().keys({
    displayName: JoiDisplayName.required(),
    age: JoiAge.required()
  });

  return Joi.validate(args, newUserSchema);
};

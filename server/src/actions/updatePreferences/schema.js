import Joi from 'joi';

import { JoiMinimumAge, JoiMaximumAge, JoiGenderPreference, JoiOptions } from '../../joi';

export default args => {
  const peferencesSchema = Joi.object().keys({
    minAge: JoiMinimumAge.required(),
    maxAge: JoiMaximumAge.required(),
    gender: JoiGenderPreference.required()
  });

  return Joi.validate(args, peferencesSchema, JoiOptions);
};

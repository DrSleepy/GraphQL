import escape from 'lodash.escape';
import Joi from 'joi';
import { JoiDisplayName, JoiAge } from '../../../joi';

// validate input with npm Joi
const newUserSchema = Joi.object().keys({
  displayName: JoiDisplayName.required(),
  age: JoiAge.required()
});

export default args => {
  // sanitise input with npm lodash.escape
  const displayName = escape(args.displayName);
  const age = escape(args.age);

  const sanitisedNewUser = { displayName, age };

  // return validation result
  return Joi.validate(sanitisedNewUser, newUserSchema);
};

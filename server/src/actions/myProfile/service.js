import UserModel from '../../models/User';

export default (args, context) => UserModel.findById(context.userId);

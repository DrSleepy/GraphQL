import UserModel from '../../blueprints/User';

export default (args, context) => UserModel.findById(context.userId);

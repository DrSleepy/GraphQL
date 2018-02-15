import UserModel from '../../models/User';

export default context => UserModel.findById(context.userId);

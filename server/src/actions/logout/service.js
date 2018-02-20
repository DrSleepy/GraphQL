export default async (args, context) => {
  context.res.clearCookie('token');
  return true;
};

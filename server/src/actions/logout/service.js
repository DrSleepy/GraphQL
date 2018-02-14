export default async context => {
  context.res.clearCookie('token');
  return true;
};

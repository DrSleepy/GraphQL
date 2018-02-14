export default async context => {
  context.res.clearCookie('token');
  console.log(`deleting: ${context.req.userId}`);

  return true;
};

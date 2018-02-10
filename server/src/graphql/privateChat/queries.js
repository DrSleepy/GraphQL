const privateChats = [
  { name: 'this is privateChat1 from server/graphql/privateChat/queries' },
  { name: 'this is privateChat2 from server/graphql/privateChat/queries' },
  { name: 'this is privateChat3 from server/graphql/privateChat/queries' },
  { name: 'this is privateChat4 from server/graphql/privateChat/queries' }
];

export default {
  getAllPrivateChats: () => privateChats
};

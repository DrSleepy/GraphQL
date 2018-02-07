const data = [
  { name: 'bob', age: 1, gender: 'male' },
  { name: 'jim', age: 2, gender: 'female' },
  { name: 'steve', age: 3, gender: 'male' },
  { name: 'alice', age: 4, gender: 'femaleeee' }
];

const createNewUser = (/* root, args */) => data;
// pass arguments to MODULES/USER/CONTROLLER. validaiton etc happens there

// export const userQueries = {
//   Query: {
//     getAllUsers: () => data
//   }
// };

// export const userMutations = {
//   Mutation: {
//     createNewUser
//     // createNewUser2
//   }
// };

export const userQueries = {
  getAllUsers: () => data
};

export const userMutations = {
  createNewUser
};

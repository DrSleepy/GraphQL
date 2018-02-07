const data = [
  { name: 'bob', age: 1, gender: 'male' },
  { name: 'jim', age: 2, gender: 'female' },
  { name: 'steve', age: 3, gender: 'male' },
  { name: 'alice', age: 4, gender: 'female' }
];

export default {
  Query: {
    allData: () => data
  },

  Mutation: {
    addData: (/* root, args */) => data
    //  modules/User/UserController.
    // That file will handle everything from validtion, insertion etc

    // validate data
    // args = POST data. Can use { id, name } to destructure object
    // addData should return  Model.insert({ name: 'bob', age: 1, gender: 'male'})
  }
};

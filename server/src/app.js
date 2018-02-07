import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';

import { PORT } from './config';
import schema from './graphql/registerGraphQL';

// Connects to DB
import './connection';

const app = express();

// Middleware
app.use(bodyParser.json());

// Graphql
app.use(
  '/graphiql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Server
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

// Mongodb test
// import User from './models/User';

// const user = new User({
//   displayName: 'Jimmy'
// });

// user.save((err, results) => {
//   console.log(results);
//   console.log(err);
// });

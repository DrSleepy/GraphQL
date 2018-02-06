import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';

import config from './config';
import schema from './registerApi';

import './connection';
import './mongoTest';

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
app.listen(config.port, () => {
  console.log(`Server has started on port ${config.port}`);
});

// To Do:
// 1. Sanitize all user input
// 2. Use Helmet npm
// 3. Prevent CSRF with csurf npm

import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import { PORT, JWT_SECRET } from './config';
import schema from './graphql/registerGraphQL';
import { verifyToken } from './jwt';

// Connects to DB
import './connection';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(verifyToken);

// Graphql
app.use(
  '/graphiql',
  graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
      JWT_SECRET,
      userId: req.userId
    }
  }))
);

// Server
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

// To Do:
// 1. Use Helmet npm
// 2. Prevent CSRF with csurf npm

import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

import { PORT, JWT_SECRET } from './config';
import schema from './graphql/registerGraphQL';

import { verifyToken } from './jwt';

// Connects to DB
import './connection';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(verifyToken);

// app.use(csrf());

// Graphql
const graphqlHTTPMiddleware = graphqlHTTP((req, res) => ({
  schema,
  graphiql: true,
  context: {
    req,
    res,
    JWT_SECRET,
    userId: req.userId
  }
}));
app.use('/graphiql', graphqlHTTPMiddleware);

// Server
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

// To Do:
// 1. Use Helmet npm
// 2. Prevent CSRF with csurf npm

import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

import { PORT, JWT_SECRET } from './config';
import { verifyToken } from './jwt';
import schema from './graphql/registerGraphQL';

// Connects to DB
import './connection';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(verifyToken);

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

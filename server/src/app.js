import cors from 'cors';
import helmet from 'helmet';
import logged from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import graphqlHTTP from 'express-graphql';

import { verifyToken } from './jwt';
import { PORT, JWT_SECRET } from './config';
import schema from './graphql/registerGraphQL';

// Connects to DB
import './connection';

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(logged('dev'));
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
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

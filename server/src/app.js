import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';

import { PORT } from './config';
import schema from './graphql/registerGraphQL';

// Connects to DB
import './connection';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Graphql
app.use(
  '/graphiql',
  graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      lol: 'LOOOOOOOOOOOOOOOOOL USED HERE'
    }
  })
);

// Server
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;

mongoose
  .connect(config.database.uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });

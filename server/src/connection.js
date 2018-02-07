import mongoose from 'mongoose';
import { DB_URI } from './config';

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err);
  });

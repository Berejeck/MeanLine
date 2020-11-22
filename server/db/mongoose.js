// This file will handle connection logic to MongoDB
import mongoose from 'mongoose';
import multer  from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';

Promise = global.Promise;
const db = 'mongodb://localhost/checkInterface';
// const db = process.env.MONGODB_URI;
// console.log('db', db);

mongoose.connect(db,  {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB succesfully :))) ");

}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB. \n");
    console.log(e);
});

// To prevent deprecationn warnings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

export default {
    mongoose
};

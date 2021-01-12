// This file will handle connection logic to MongoDB
import mongoose from 'mongoose';

Promise = global.Promise;
const db = 'mongodb://localhost/baseline';

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

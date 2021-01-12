import express from 'express';
import cors from 'cors';
import session from 'express-session';
const router = express.Router();
// import FileStore from 'session-file-store';
// const fileStore = FileStore.session;
const app = express()
const port = 5100

import mongoose from './db/mongoose.js';
import { setCustomEnvVariables } from './config/config.js';
import { passport } from './config/passportConfig.js';

/** MIDDLEWARE */
setCustomEnvVariables();

// Load middleware:
app.use(express.json());
app.use(cors());

app.use(session({
//    store: fileStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

/** ROUTES HANDLER */

/* User ROUTES */
// Routes which should handle requests for Users
import routerUser from './db/routes/users.js';
app.use("/", routerUser);


app.use((req, res, next) => {
    const error = new Error("Not found - default 2");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
});

// console.log(process.env);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
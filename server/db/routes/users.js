import mongoose from 'mongoose';
import passport from 'passport';
import loadash from 'lodash';
import express from 'express';
import session from 'express-session';
const routerUser = express.Router();
import User from '../models/user.model.js';

routerUser.post("/register", (req, res, next) => {
    const user = new User.User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then(result => {
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdUser: result
            });
        })
        .catch(err => {
            if (err.code == 11000) {
                res.status(422).json({errMessage: 'Duplicate email adrress found.'});
            } else {
                res.status(500).json({
                    error: err
                });
            }
        });
    // */
});
/*
routerUser.post("/authenticate", (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        if (err) {
            return res.status(400).json(err);
        } else if (user) {
            // registered user
//            return res.status(200).json({ "token": user.generateJwt(), "fullName": user.fullName, "email": user.email });
            return res.status(200).json({ "token": user.generateJwt() });
        } else {
            // unknown user or wrong password
            return res.status(404).json(info);
        }
    })(req, res);
});
// */

routerUser.post("/authenticate", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) { return res.send(info.message) }
        if (err) { return next(err); }
        if (!user) { return res.status(404).json(info); }
        req.login(user, (err) => {
//            console.log('Inside req.login() callback')
            if (err) { return next(err); }
//            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
//            console.log(`req.user: ${JSON.stringify(req.user)}`)
            return res.status(200).json({ "token": user.generateJwt(), "fullName": user.fullName, "email": user.email });
        })
      })(req, res, next);
});



routerUser.get("/userProfile/:id", (req, res, next) => {
    // console.log('sono in userProfile', req.params);
    User.User.findOne({ _id: req.params.id},
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : loadash.pick(user,['fullName','email']) });
        }
    );
});


export default routerUser;
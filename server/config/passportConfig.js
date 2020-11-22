import passport from 'passport';
import _  from 'passport-local';
import User from '../db/models/user.model.js';

passport.use(
    new _.Strategy({ usernameField: 'email' },
        (username, password, done) => {
            User.User.findOne({ email: username },
                (err, user) => {
                    if (err) {
                        return done(err);
                    } else if (!user) {
                        // unknown user
                        return done(null, false, { message: 'Email is not registered' });
                    } else if (!user.verifyPassword(password)) {
                        // wrong password
                        return done(null, false, { message: 'Wrong password.' });
                    } else {
                        // authentication succeeded
                        return done(null, user);
                    }
                });
        })
);

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    // console.log("deserialize");
    User.User.findById(id, function(err, user) {
        // console.log(`user: ${JSON.stringify(user)}`);
        done(err, user);
    });
});

export { passport }
// import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import lodash from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT Secret => da ENV
// const jwtSecret = "FHOWIGHEW658437684fje4fe04j3209GJHRGRUIW";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password must be atleast 4 character long']
    },
    saltSecret: String
});

// *** Instance Methods *** //
// Custom validation for email

UserSchema.path('email').validate((val) => {
    // console.log('Validate email');
    // tslint:disable-next-line:max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
//*/

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    // return the document excpet the pwd and session
    return lodash.omit(userObject, ['password','sessions']);
}

// Events
UserSchema.pre('save', function (next) {
    let user = this;
    const costFactor = 10;

    bcrypt.genSalt(costFactor, (error, salt) => {
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                next(error);
            } else {
                user.password = hash;
                user.saltSecret = salt;
                next();
            }
        });
    });
});

// Methods
UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
    // console.log('sono in generateJwt', process.env.JWT_SECRET);
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

/*

UserSchema.methods.generateAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        // Create the Json Web Token
        jsonwebtoken.sign({ _id: user._id.toHexString()}, jwtSecret, { expiresIn: "15m" }, (err, token) => {
            if (!err) {
                resolve(token);
            } else {
                reject();
            }
        })
    });

}

UserSchema.methods.generateRefreshAuthToken = function() {
    // This method generates 64B hex string => not saved; saveSessiontodb does that.
    return new Promise((resolve, reject) => {
        randomBytes(64, (err, buf) => {
            if (!err) {
                let token = buf.toString('hex');

                return resolve(token);
            } else {
                reject();
            }
        })
    });
}

UserSchema.methods.createSession = function() {
    let user = this;

    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) =>{
        return refreshToken;
    }).catch((e) => {
        return Promise.reject('failed to save session to DB.\n' + e);
    });
}
// */
/* MODEL METHODS (Static methods) */
/*
UserSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}

UserSchema.statics.findByIdAndToken = function(_id, token) {
    const User = this;
    return User.findOne({
        _id,
        'sessions.token': token
    });
}

UserSchema.statics.findByCredentials = function(email, password) {
    let User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            compare(password, user.password, (err, res) => {
                if (res) resolve(user);
                else {
                    reject();
                }
            })
        })
    })
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        // hasn't expired
        return false;
    } else {
        return true;
    }
}

// */
/* MIDDLEWARE */
// Before a user doc is saved, this code runs
/*
UserSchema.pre('save', function (next) {
    let user = this;
    let costFactor = 10;

    if(user.isModified('password')) {
        // if the pwd field has been edited or changed, then run this code
        // generate salt and hash password
        genSalt(costFactor, (err, salt) => {
            _hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }

})
// */
/* HELPER METHODS */
/*
let saveSessionToDatabase = (user, refreshToken) => {
    //Save session to DB
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();

        user.sessions.push({ 'token': refreshToken, expiresAt });

        user.save().then( () => {
            return resolve(refreshToken);
        }).catch( (e) => {
            reject(e);
        });
    })
}

let generateRefreshTokenExpiryTime = () => {
    let daysUntilExpire = "10";
    let secondsUntilExpire = (((daysUntilExpire * 24) * 60 ) * 60);
    return ((Date.now() / 1000) + secondsUntilExpire);
}
// */
const User = mongoose.model('User', UserSchema);
export default { User }

// mongoose.connect('mongodb://localhost/checkInterface',  {useNewUrlParser: true});

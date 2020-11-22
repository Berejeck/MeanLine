
export function setCustomEnvVariables() { 
    // check env.
    var env = process.env.NODE_ENV || 'development';
    // fetch env. config
    var config = {
        "development": {
            "PORT": 5100,
            "MONGODB_URI": "mongodb://localhost/",
            "JWT_SECRET": "SECRET#123abcdef010102020303456789!",
            "JWT_EXP": "31d"
        },
        "production": {
            "PORT": 5000,
            "MONGODB_URI": "mongodb://localhost/",
            "JWT_SECRET": "SECRET#123abcdef010102020303456789!",
            "JWT_EXP": "31d"
        }
    };

    var envConfig = config[env];
    // add env. config values to process.env
    Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
}
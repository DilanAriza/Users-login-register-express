const mongoose = require('mongoose');

const dbName = 'users-login-register';

module.exports = {
    connect: () => mongoose.connect('mongodb://localhost/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }),
    dbName,
    connection: () => {
        if (mongoose.connection)
            return mongoose.connection;
        return this.connect();
    }
}
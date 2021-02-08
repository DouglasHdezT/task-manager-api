const Mongoose = require("mongoose");
const debug = require("debug")("app:database");

const host = process.env.DBHOST || "localhost";
const port = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "TODOList";

const dburi = process.env.DBURI || `mongodb://${host}:${port}/${dbname}`;

/**
 * Connection to Mongo database method
 */
const connect = async () => {
    try {
        await Mongoose.connect(dburi, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        
        debug("Connection to database start");
    } catch (error) {
        debug("Cannot connect to database");
        process.exit(1);
    }
};

module.exports = { 
    connect
}
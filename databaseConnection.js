require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var database;
var initDb = function() {
    MongoClient.connect('mongodb://' + process.env.IP + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME, function(err, db) {
        if(err || db === undefined || db === null) {
            throw err;
        } else {
            console.log("We are connected");
            database = db;
        }
    });
}

var getDb = function() {
    if(database === null || database === undefined) {
        initDb();
    }
    return database;
}

exports.initDb = initDb;
exports.getDb = getDb;
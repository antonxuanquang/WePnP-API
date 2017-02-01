require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

var database;
var initDb = function() {
    MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
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
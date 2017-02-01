//mongod --repair --dbpath=data
require('dotenv').config();
var mongodb = require('mongodb');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var getDb = require("./databaseConnection").getDb;

var insertDocument = function(data) {
    return new Promise((resolve, reject) => {
        data.listingRate = 0.0;
        data.listingReviewsCount = 0;
        getDb().collection('restaurants').insert(data, function(err, result) {
            if (err) {
                reject(err);
            } else {
                // console.log("Listing rate : " + result);
                resolve(result);
            }
        });
    });
};
    
var findAll = function() {
    return new Promise((resolve, reject) => {
        var cursor = getDb().collection('restaurants').find({});
        var list = [];
        cursor.each((err, doc) => {
            if (err) 
                return reject(err);
            if (doc != null) {
                // console.log("Found : " +doc);
                list.push(doc);
            } else {
                // console.log(list);
                resolve(list);
            }
        });
    });
};

var findRandomListing = function(data) {
    return new Promise((resolve, reject) => {
        //console.log("data = "+ data);
        getDb()
        .collection(process.env.RESTAURANT_COLLECTION)
        // .aggregate([
        //     { $sample: { size: 3 } }
        // ], (error, result) => {
        //     if (error) {
        //         reject(error);
        //     } else {
        //         resolve(result);
        //     }
        // })
        .find(
            data, 
            ['id', 'listingTitle', 'listingAddress', 'listingCity',  'listingState',  'listingState',  'listingZipCode', 'listingPhone', 'listingRate', 'listingReviewsCount']
        )
        .skip(Math.round(Math.random() * 6))
        .limit(6)
        .toArray((error, doc) => {
            if (error) {
                reject(error);
            } else {
                resolve(doc);
            }
        });
    });
};

var findListingWithId = function(id) {
    return new Promise((resolve, reject) => {
        getDb()
        .collection(process.env.RESTAURANT_COLLECTION)
        .findOne(
            {id: id}, 
            (err, doc) => {
                if (err) {
                    reject("Can't find document with id" + id);
                } else {
                    resolve(doc);
                }
            }
        );
    });
}

var findPriceRange = function(data) {
    return new Promise((resolve, reject) => {
        // console.log("data = "+ data);
        
        var cursor = getDb().collection('restaurants').find( { $and: [ { price: { $gt: data.lower } }, { price: { $lt: data.upper } } ] } );
        var list = [];
        cursor.each((err, doc) => {
            if (err) 
                return reject(err);
            if (doc != null) {
              list.push(doc);
            } else {
              resolve(list);
            }
        });
    });
};

//Test Find with AND condition 
var findAnd = function(data) {
    return new Promise((resolve, reject) => {
        console.log("Find AND, data = "+ data);
        var cursor = getDb().collection('restaurants').find( { $and: [ { name: data.name }, { host:data.abc } ] } );
        var list = [];
        cursor.each((err, doc) => {
            if (err) 
                return reject(err);
            if (doc != null) {
              list.push(doc);
            } else {
              resolve(list);
            }
        });
    });
};

var removeAll = function() {
    return new Promise((resolve, reject) => {
        getDb().collection('restaurants').deleteMany({}, function(err, results) {
            if(err){
                reject(err);
            }
            else{
                // console.log(results);
                resolve("Removed all entries in the database");
            }
        });
    });
};

exports.findAll = findAll;
exports.insertDocument = insertDocument;
exports.removeAll = removeAll;
exports.findRandomListing = findRandomListing;
exports.findPriceRange = findPriceRange;
exports.findAnd = findAnd;
exports.findListingWithId = findListingWithId;
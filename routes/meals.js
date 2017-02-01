const express = require('express');
const router = express.Router();
const dbHelper = require("../database.js");

var url = require("url");

router
.get('/', (req, res, next) => {
    dbHelper.findAll()
    .then((message) => {
        // console.log(message);
        res.send(message);
    })
    .catch((error) => {
        // console.log('error');
    });
    
})

//Insert a document into the Restaurant database using the insertDocuments() method
.post('/', (req, res, next) => {
    // database.save(req.post);
    var doc = req.body;
    doc.id = Math.random().toString(10).substr(2, 10);
    dbHelper.insertDocument(doc)
    .then((message) => {
        res.send(message);
    })
    .catch((error) => {
        res.send(error);
    })
})

// .delete('/', (req, res, next) => {
//     // database.save(req.post);
//     dbHelper.removeAll()
//     .then((message) => {
//         res.send(message);
//     })
//     .catch((error) => {
//         res.send(error);
//     })
// })

//top views: return 6 documents to load the top view secion
.get('/topviews', (req, res, next) => {
    
    var parsedUrl = url.parse(req.url, true); // true to get query as object
    var queryAsObject = parsedUrl.query;

    // console.log(JSON.stringify(queryAsObject));
    dbHelper.findRandomListing(queryAsObject)
    .then((message) => {
        // console.log("find specific");
        // console.log(message);
        res.send(message);
    })
    .catch((error) => {
        // console.log('error');
    });
    
})

//around me: return 6 documents to load the around secion
.get('/aroundme', (req, res, next) => {
    
    var parsedUrl = url.parse(req.url, true); // true to get query as object
    var queryAsObject = parsedUrl.query;

    // console.log(JSON.stringify(queryAsObject));
    dbHelper.findRandomListing(queryAsObject)
    .then((message) => {
        // console.log("find specific");
        // console.log(message);
        res.send(message);
    })
    .catch((error) => {
        console.log('error');
        res.send(error);
    });
})

//top rate: return 6 documents to load the top rate secion
.get('/toprate', (req, res, next) => {
    
    var parsedUrl = url.parse(req.url, true); // true to get query as object
    var queryAsObject = parsedUrl.query;

    // console.log(JSON.stringify(queryAsObject));
    dbHelper.findRandomListing(queryAsObject) //url.parse(req.url, true).query
    .then((message) => {
        // console.log("find specific");
        // console.log(message);
        res.send(message);
    })
    .catch((error) => {
        // console.log('error');
    });
})

.get('/and', (req, res, next) => {
    
    var parsedUrl = url.parse(req.url, true); // true to get query as object
    var queryAsObject = parsedUrl.query;
    
    //console.log("!!!!Length = " + Object.keys(queryAsObject).length);
    if(Object.keys(queryAsObject).length !== 2){
        var err = new Error("Wrong input!");
        err.status = 404;
        next(err);
        return;
    }

    // console.log(JSON.stringify(queryAsObject));
    dbHelper.findAnd(queryAsObject)
    .then((message) => {
        // console.log("find AND");
        res.send(message);
    })
    .catch((error) => {
        // console.log('error');
    });
    
})

.get('/:id', (req, res, next) => {
    dbHelper.findListingWithId(req.params.id)
    .then((doc) => {
        res.json(doc);
    })
    .catch((error) => {
        res.send(error);
    })
})

.post('/:id', (req, res, next) => {
    res.send('Update meals id ' + req.params.id + ' with information ' + req.body.data);
})

module.exports = router;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/School-Management";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db.createCollection("admins", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    db.createCollection("courses", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    db.createCollection("students", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    db.createCollection("sessions", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
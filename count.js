var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

db.get('vehicles')
    .size()
    .value()

    console.log(db.get('vehicles').size().value())

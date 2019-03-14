var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);

var busId = db.get('vehicles').map('id').value()

var uniqueId = [...new Set(busId)]

console.log(uniqueId)

var length = uniqueId.length

console.log(length)
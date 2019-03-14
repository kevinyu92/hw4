const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ busdata: [], user: {} })
  .write()

  busdata=[12345, 56789]

  db.get('busdata')
  .find({ id: 1, lat: 12345 })
  .value()
 
// Add a post
// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()
 
// Set a user using Lodash shorthand syntax
// db.set('user.name', 'typicode')
//   .write()
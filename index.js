const connect = require('./src/connect')

module.exports = async (sbot, url, key, collections) => {
  var db = require('mongojs')(url, collections)
  const connections = await collections.map(collection => {
    var Model = db.collection(collection)
    db.on('error', (err) => {
      console.log('database error', err)
    })
  
    db.on('connect', () => {
      console.log('database connected')
      return connect(sbot, collection)(Model)
    })
  })

  return connections
}

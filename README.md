# open-app-mongo [![Build Status](https://travis-ci.org/open-app/open-app-mongo.svg?branch=master)](https://travis-ci.org/open-app/open-app-mongo) [![dependencies Status](https://david-dm.org/open-app/open-app-mongo/status.svg)](https://david-dm.org/open-app/open-app-mongo)

Connect ssb messages to mongo collections.

```js
var sbot = require('scuttlebot')({ /* ... */ })
var connect = require('open-app-mongo')

var db = require('mongojs')('blog', ['posts'])
var Posts = db.collection('posts')

var conn = connect(sbot, 'add-post')(Posts)
// All future add-post messages will now appear in the Posts collection
// (Call `conn.abort()` to stop)
```

## API

### `connect(sbot, messageType[, opts])(collection)`

Connect scuttlebot messages of type `messageType` to the mongo `collection`.

* `sbot` (`Scuttlebot`) a scuttlebot server
* `messageType` (`String`|`Array`) the type(s) of message to connect to this collection
* `[opts.transform]` (`Function`) async transform the message contents before inserting into mongo (signature is `transform (content, cb)`). Callback with `null` to effectively filter messages
* `[opts.gte]` (`Number`) optional timestamp after which to start receiving messages (default `Date.now()`)
* `[opts.concurrency]` (`Number`) the number of concurrent mongo inserts (default 1 to maintain message order)
* `collection` (`Object`) a mongo collection object

Returns a [`pull-abortable`](https://pull-stream.github.io/#pull-abortable) instance, allowing you to call `abort([err])` in order to stop the connection.
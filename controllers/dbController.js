var sql = require('sql');
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database(':memory:');
sql.setDialect('sqlite');

var message = sql.define({
	name: 'message',
	columns: ['id', 'userId', 'timestamp', 'read', 'body']
});

var user = sql.define({
	name: 'user',
	columns: ['id', 'hashToken']
});

var addMessage = function(userId, timestamp, body) {
	var query = message.insert(
		message.id.value(0),
		message.userId.value(userId),
		message.timestamp.value(timestamp),
		message.read.value(false),
		message.body.value(body)
	).toQuery();
	console.log(query.text);
	console.log(query.values);
	//db.run(query.text);
}

module.exports = {addMessage};

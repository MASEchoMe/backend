// var sql = require('sql');
// var sqlite3 = require('sqlite3');

// var db = new sqlite3.Database(':memory:');
// sql.setDialect('sqlite');

// var message = sql.define({
// 	name: 'message',
// 	columns: ['id', 'userId', 'timestamp', 'read', 'body']
// });

// var user = sql.define({
// 	name: 'user',
// 	columns: ['id', 'hashToken']
// });

// var addMessage = function(userId, timestamp, body) {
// 	var query = message.insert(
// 		message.id.value(0),
// 		message.userId.value(userId),
// 		message.timestamp.value(timestamp),
// 		message.read.value(false),
// 		message.body.value(body)
// 	).toQuery();
// 	console.log(query.text);
// 	console.log(query.values);
// 	//db.run(query.text);
// }

/** Using DynamoDB from AWS **/

var AWS = require('aws-sdk');
// load AWS configurations
AWS.config.loadFromPath('./aws-config.json');

var dynamodb = new AWS.DynamoDB();

var addMessage = function(userId, timestamp, body) {
	var params = {
		TableName: 'Messages',
		Item: {
		  'id': {N: '1'},
		  'user_id': {N: userId},
		  'timestamp': {S: Date.now().toString()},
		  'read': {BOOL: false},
		  'body': {S: body}
		}
	  };
	  
	  dynamodb.putItem(params, function(err, data) {
		if (err) {
		  console.log("Error", err);
		} else {
		  console.log("Success", data);
		}
	  });
}

var getMessages = function(userId) {
	var params = {
		RequestItems: {
		  'Messages': {
			Keys: [
			  {'id': {N: userId}}
			],
			ProjectionExpression: 'userId, body'
		  }
		}
	  };
	  
	  dynamodb.batchGetItem(params, function(err, data) {
		if (err) {
		  console.log("Error", err);
		} else {
		  data.Responses.Messages.forEach(function(element, index, array) {
			console.log(element);
		  });
		}
	  });
}

module.exports = {addMessage, getMessages};

/** Using DynamoDB from AWS **/

var AWS = require('aws-sdk');
// load AWS configurations
AWS.config.loadFromPath('./aws-config.json');

var dynamodb = new AWS.DynamoDB();

var addMessage = function(messageId, userId, body) {
	var params = {
		TableName: 'Messages',
		Item: {
			'messageId': {N: messageId},
			'userId': {N: userId},
			'receivedTime': {S: new Date().toString()},
			'read': {BOOL: false},
			'body': {S: body}
		}
	};
	
	dynamodb.putItem(params, function(err, data) {
		if (err) {
			console.log("Error", err);
		} else {
			console.log("Successfully added message");
		}
	});
}

var getMessages = function(userId, res) {

	var params = {
		RequestItems: {
			'Messages': {
				Keys: [
					{'messageId': {N: "1"}}
				],
				ProjectionExpression: 'userId, receivedTime, body'
			}
		}
	};
	  
	dynamodb.batchGetItem(params, function(err, data) {
		if (err) {
			console.log("Error", err);
		} else {
			console.log("data", data.Responses.Messages);
			data.Responses.Messages.forEach(function(element, index, array) {
				// set 'read' to true
				res.json(element);
			});
		}
	});
}




// /** Using RDS from AWS **/

// var mysql = require('mysql');

// var db;

// var connectToDB = function() {

// 	var connection = mysql.createConnection({
// 		host: 'echome-db.cdwdr3fxmjiq.us-east-1.rds.amazonaws.com',
// 		user: 'chainvaper',
// 		password: 'Chainvapers!',
// 		port: 3306,
// 		database: 'echome_db'
// 	});

// 	return connection.connect(function(err) {
// 		if (err) {
// 			console.log(err.stack);
// 		} else {
// 			console.log("Successfully connected to database")
// 		}
// 	});
// }

// var getMessages = function(userId, res) {

// 	if (!this.db) {
// 		this.db = connectToDB();
// 	}

// 	this.db.query('SELECT * FROM messages', function (err, results) {
// 		if (err) {
// 			console.log(err.stack);
// 		} else {
// 			console.log("user ID", userId);
// 			console.log(results);
// 		}
// 	});
// }

// var addMessage = function(messageId, userId, body) {

// }





module.exports = {addMessage, getMessages};

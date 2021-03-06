var mysql = require('mysql');

// Configuration for database connection
// TODO: move this to a config file and don't hardcode the password
var connection = mysql.createConnection({
	host: 'echome-db.cdwdr3fxmjiq.us-east-1.rds.amazonaws.com',
	user: 'chainvaper',
	password: 'Chainvapers!',
	port: 3306,
	database: 'echome_db'
});

// Establish a connection to the database
connection.connect(function(err) {
	if (err) throw err;
	console.log("Successfully connected to database");
});

/****************************** Database Controller Methods ******************************/

/**
 * Adds a user to the 'users' table in the database
 * 
 * @param {*} name 
 * @param {*} res 
 */
var addUser = function(name, groupId, token, res, callback) {

/* TODO:::::::::::::: */
/* UPDATE THE QUERY TO INCLUDE GROUPID AND TOKEN */
	var query = 'INSERT INTO users (name, create_date, token, group_id, is_active) VALUES (?, ?, ?, ?, 1)';

	connection.query(query, [name, new Date(), token, groupId], function (err, results) {
		if (err) {
			res.status(400);
			console.log(err);
			res.send("A database error occured");
		} else {
			callback();
		}
	});
}

/**
 * Add a message to the 'messages' table in the database
 * 
 * @param {*} recipient
 * @param {*} groupId
 * @param {*} sender
 * @param {*} message
 * @param {*} res
 */
var addMessage = function(recipient, groupId, sender, message, res) {
	
	var query = `INSERT INTO messages (group_id, sender_name, recipient_name,
						message, is_read, create_date, expiration_date,
						is_reminder, next_remind_date, reminder_frequency_id)
					VALUES (?)`;

	var values = [
		groupId,			//group_id
		sender,		//sender_name
		recipient,		//recipient_name
		message,			//message
		0,					//is_read
		new Date(),			//create_date
		null,				//expiration_date
		0,					//is_reminder
		null,				//next_remind_date
		null				//reminder_frequency_id
	];

	connection.query(query, [values], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send("Successfully added " + sender + "'s message to " + recipient);
		}
	});
}

/**
 * Deletes a message from the 'messages' table in the database
 * 
 * @param {*} messageId 
 * @param {*} res 
 */
var deleteMessage = function(messageId, res) {

	var query = 'DELETE FROM messages WHERE message_id=?';
	
	connection.query(query, [messageId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send("Successfully deleted message " + messageId);
		}
	});
}

/**
 * Returns all the messages for a particular user
 * 
 * @param {*} name
 * @param {*} groupId 
 * @param {*} res 
 */
var getMessages = function(name, groupId, res) {

	// get the messages for the user with 'user_id'
	var query = 'SELECT sender_name, message, message_id, create_date FROM messages WHERE recipient_name=? and group_id=?';

	connection.query(query, [name, groupId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(results);
		}
	});

	// update the messages to read by changing each message's 'is_read' value to 1
	query = 'UPDATE messages SET is_read = 1 WHERE recipient_name=? and group_id=?';

	connection.query(query, [name, groupId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		}
	});
}

/**
 * Returns all the unread messages for a particular user
 * 
 * @param {*} name 
 * @param {*} groupId 
 * @param {*} res 
 */
var getUnreadMessages = function(name, groupId, res) {
	
	// get the messages for the user with 'user_id'
	var query = 'SELECT sender_name, message, message_id, create_date FROM messages '
				+ 'WHERE recipient_name=? and group_id=? and is_read=0';

	connection.query(query, [name, groupId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(results);
		}
	});

	// update the messages to read by changing each message's 'is_read' value to 1
	query = 'UPDATE messages SET is_read = 1 WHERE recipient_name=? and group_id=?';

	connection.query(query, [name, groupId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		}
	});
}

/**
 * Returns a user using his/her name and groupId
 * 
 * @param {*} name 
 * @param {*} groupId 
 * @param {*} callback 
 */
var getUserByNameAndGroupId = function(name, groupId, callback) {
	// get user with name and groupId
	var query = 'SELECT name, group_id FROM users WHERE name=? and group_id=?';

	connection.query(query, [name, groupId], function(err, results) {
		if (err) {
			callback(null);
		} else {
			var user = {
				"name": results[0].name,
				"groupId": results[0].group_id
			};
			callback(user);
		}
	});
}

/**
 * Get all the active users within a particular group
 * 
 * @param {*} groupId 
 * @param {*} res 
 */
var getUsersByGroup = function(groupId, res) {
	var query = 'SELECT name FROM users WHERE group_id=? and is_active=1';
	
	connection.query(query, [groupId], function (err, results) {
		if (err) {
			res.status(400);
			res.send(err);
		} else {
			res.send(results);
		}
	});
};

module.exports = {addUser, addMessage, deleteMessage, getMessages, getUnreadMessages,
		getUserByNameAndGroupId, getUsersByGroup};

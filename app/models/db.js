var Sequelize = require('sequelize')
	, connection = require('./connection');

module.exports = new Sequelize(connection.database_name, connection.username, connection.password, {
	host: connection.host,
	port: connection.port
});
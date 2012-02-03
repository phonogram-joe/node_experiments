var db = require('./db');

module.exports = db.define('anken', {
	id: { type: db.INTEGER, primaryKey: true }
	, name: { type: db.STRING, allowNull: false }
});
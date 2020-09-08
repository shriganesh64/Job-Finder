const Sequelize = require('sequelize');
const Config = require('./configuration.json');
const dbInstance = Config[process.env.NODE_ENV];

const database = new Sequelize(dbInstance.dbName, dbInstance.userName, dbInstance.passWord, {
	dialect: 'mysql',
	host: dbInstance.hostUrl,
	port: 3306,
	logging: false,
	sync: {
		force: false
	},
	freezeTableName: true,
	pool: {
		max: 80,
		min: 20,
		acquire: 60000,
		idle: 10000
	}
});

module.exports = {
	database
};

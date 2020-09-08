const express = require('express'),
	createError = require('http-errors'),
	cors = require('cors'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const sequelize = require('./config');
sequelize.database
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
		sequelize.database.sync({
			force: false
		});
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '100mb',
		extended: true
	})
);
app.use(bodyParser.text());
app.use(cors());
app.use((req, res, next) => {
	Object.keys(req.body || {}).forEach(key => {
		if (req.body[key]) {
			if (!isNaN(req.body[key])) {
				req.body[key] = Number(req.body[key]);
			} else if (req.body[key] === 'true' || req.body[key] === 'false') {
				req.body[key] = req.body[key] === 'true' ? true : false;
			} else if (req.body[key] === 'null') {
				req.body[key] = null;
			}
		}
	});
	next();
});

const { adminApiRouter } = require('./src/routes');

app.use('/api', adminApiRouter);

app.use((req, res, next) => {
	next(createError(404));
});

app.use((err, req, res, next) => {
	console.log(err);
	res.locals.message = err.message;
	res.status(err.status || 500);
	res.send({
		statusCode: 500,
		result: {
			message: 'Something went to wrong'
		}
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Listening on port: ${process.env.PORT}`);
});

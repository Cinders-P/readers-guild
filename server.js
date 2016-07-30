// DEPENDENCIES
const express = require('express');
const stylus = require('stylus');
const app = express();
const server = require('http').createServer(app);
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = mongoose.connection;
// const keys = require('./config/keys');
const flash = require('connect-flash');
const passport = require('passport');

// SETTINGS
mongoose.connect(process.env.db);
db.on('error', console.error.bind(console, 'connection error:'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use(stylus.middleware({
	src: path.join(__dirname, '/stylesheets'),
	dest: path.join(__dirname, '/public/css'),
	compile: (str, p) => stylus(str).set('filename', p).set('compress', true),
}));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(compression());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());
app.use(session({
	secret: process.env.cookie,
	saveUninitialized: true,
	resave: true,
	cookie: {
		maxAge: 600000000,
	},
}));
app.use(passport.initialize());
app.use(passport.session());
require('./controllers/passport')(passport);
app.use(flash());

// ROUTES
require('./routes')(app, passport);

// LAUNCH
server.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on port ${process.env.PORT || 3000}`);
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routers = require('./controllers/routers');

const errorMiddleware = require('./controllers/middlewares/error.middleware');

/**
 * ENVIRONMENT VARIABLE
 */

require('dotenv').config();

/**
 * REST API WEB
 */

const app = express();

/**
 * MIDDLEWARE
 */

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

/**
 * ROUTERS
 */

require('./controllers/passport');
routers(app);

/**
 * MIDDLEWARE
 */

app.use(errorMiddleware.errorHandle);

/**
 * RUN SERVER
 */

app.listen(process.env.BACKEND_PORT, () => {
    console.log("Connected successfully to server on port: " + process.env.BACKEND_PORT + " - http://localhost:" + process.env.BACKEND_PORT);
});
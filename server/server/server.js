const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/userModel');
const routes = require('./routes/route');
const cors = require('cors');
const logger = require('./common/logger');

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const app = express();

const PORT = process.env.PORT || 3000;

mongoose
    .connect('mongodb://localhost:27017/rbac', {
        useCreateIndex: true,
        useNewUrlParser: true,
    })
    .then(() => {
        logger.info('Connected to the DB successfully.');
    })

app.use('/profile', express.static('img'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(async (req, res, next) => {
    logger.info(`* ${req.baseUrl} ${req.path}`)
    logger.info('headers => ', req.headers)
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error : "JWT token has expired, please login to obtain a new one" });
        }
        res.locals.loggedInUser = await User.findById(userId);
        next();
    } else {
        next();
    }
});

app.use('/', routes);

app.listen(PORT, () => {
    logger.info(`server is listening on port : ${PORT}`);
})

const logger = require('../common/logger');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { roles } = require('../roles');
const TOKEN_EXPIRATION_TIME = '1h'

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action."
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

exports.allowIfLoggedIn = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user) {
            return res.status(401).json({
                error: "You need to be logged in to access this route",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async(req, res, next) => {
    try {
        /// 2020.09.30 fullName used by ng-admin's default signup 
        if (req.body.fullName) {
            req.body.username = req.body.fullName;
        }
        const { email, password, username, picture, title, role } = req.body;
        const hashedPassword = await hashPassword(password);

        
        logger.info('signup.body => ', req.body);
        const user = new User({ email, password: hashedPassword, username, picture, title, role: role || "basic" });
        const accessToken = jwt.sign({ userId: user._id, 
                                       name: user.username,
                                    //    picture: user.picture,
                                       title: user.title,
                                       role: user.role,
            }, 
            process.env.JWT_SECRET, {
                expiresIn: TOKEN_EXPIRATION_TIME,
            });
        user.accessToken = accessToken;
        await user.save();
        res.json({
            data: user,
            accessToken,
        })
    } catch (error) {
        next(error);
    }
}

exports.login = async(req, res, next) => {
    try {
        const { email, password }  = req.body;
        logger.info('login.body => ', req.body);
        const user = await User.findOne({ email });
        if (!user) return next(new Error(`Email(${email}) does not exist`));

        const validatedPassword = await validatePassword(password, user.password);
        if (!validatedPassword) return next(new Error("email or password is not correct!"));

        const accessToken = jwt.sign({ userId: user._id, 
                                       name: user.username,
                                    //    picture: user.picture,
                                       title: user.title,
                                       role: user.role,
            }, 
            process.env.JWT_SECRET, {
            expiresIn: TOKEN_EXPIRATION_TIME,
        });

        await User.findByIdAndUpdate(user._id, { accessToken });
        res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken,
        })
    } catch (error) {
        next(error);
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    logger.info('getUsers => ', users)
    
    res.status(200).json(users);
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user,
        });
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body;
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId);
        res.status(200).json({
            data: user,
            message: "User has been updated.",
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted.',
        });
    } catch (error) {
        next(error);
    }
}

exports.getMyUsers = async (req, res, next) => {
    data = [{
        id: 1,
        firstName: 'AMark',
        lastName: 'Otto',
        username: '@mdo',
        email: 'mdo@gmail.com',
        age: '28',
      }, {
        id: 2,
        firstName: 'AJacob',
        lastName: 'Thornton',
        username: '@fat',
        email: 'fat@yandex.ru',
        age: '45',
      }, {
        id: 3,
        firstName: 'ALarry',
        lastName: 'Bird',
        username: '@twitter',
        email: 'twitter@outlook.com',
        age: '18',
      }, {
        id: 4,
        firstName: 'AJohn',
        lastName: 'Snow',
        username: '@snow',
        email: 'snow@gmail.com',
        age: '20',
      }, {
        id: 5,
        firstName: 'Jack',
        lastName: 'Sparrow',
        username: '@jack',
        email: 'jack@yandex.ru',
        age: '30',
      }, {
        id: 6,
        firstName: 'Ann',
        lastName: 'Smith',
        username: '@ann',
        email: 'ann@gmail.com',
        age: '21',
      }, {
        id: 7,
        firstName: 'Barbara',
        lastName: 'Black',
        username: '@barbara',
        email: 'barbara@yandex.ru',
        age: '43',
      }, {
        id: 8,
        firstName: 'Sevan',
        lastName: 'Bagrat',
        username: '@sevan',
        email: 'sevan@outlook.com',
        age: '13',
      }, {
        id: 9,
        firstName: 'Ruben',
        lastName: 'Vardan',
        username: '@ruben',
        email: 'ruben@gmail.com',
        age: '22',
      }, {
        id: 10,
        firstName: 'Karen',
        lastName: 'Sevan',
        username: '@karen',
        email: 'karen@yandex.ru',
        age: '33',
      }, {
        id: 11,
        firstName: 'Mark',
        lastName: 'Otto',
        username: '@mark',
        email: 'mark@gmail.com',
        age: '38',
      }, {
        id: 12,
        firstName: 'Jacob',
        lastName: 'Thornton',
        username: '@jacob',
        email: 'jacob@yandex.ru',
        age: '48',
      }, {
        id: 13,
        firstName: 'Haik',
        lastName: 'Hakob',
        username: '@haik',
        email: 'haik@outlook.com',
        age: '48',
      }, {
        id: 14,
        firstName: 'Garegin',
        lastName: 'Jirair',
        username: '@garegin',
        email: 'garegin@gmail.com',
        age: '40',
      }, {
        id: 15,
        firstName: 'Krikor',
        lastName: 'Bedros',
        username: '@krikor',
        email: 'krikor@yandex.ru',
        age: '32',
      }, {
        'id': 16,
        'firstName': 'Francisca',
        'lastName': 'Brady',
        'username': '@Gibson',
        'email': 'franciscagibson@comtours.com',
        'age': 11,
      }, {
        'id': 17,
        'firstName': 'Tillman',
        'lastName': 'Figueroa',
        'username': '@Snow',
        'email': 'tillmansnow@comtours.com',
        'age': 34,
      }, {
        'id': 18,
        'firstName': 'Jimenez',
        'lastName': 'Morris',
        'username': '@Bryant',
        'email': 'jimenezbryant@comtours.com',
        'age': 45,
      }, {
        'id': 19,
        'firstName': 'Sandoval',
        'lastName': 'Jacobson',
        'username': '@Mcbride',
        'email': 'sandovalmcbride@comtours.com',
        'age': 32,
      }, {
        'id': 20,
        'firstName': 'Griffin',
        'lastName': 'Torres',
        'username': '@Charles',
        'email': 'griffincharles@comtours.com',
        'age': 19,
      }];
    try {
        res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}

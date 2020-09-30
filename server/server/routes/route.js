const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const apiBase = "/api/v1";

router.post(apiBase + '/auth/signup', userController.signup);

router.post(apiBase + '/auth/login', userController.login);

router.get(apiBase + '/user/:userId', userController.allowIfLoggedIn, userController.getUser);

router.get(apiBase + '/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put(apiBase + '/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete(apiBase + '/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.get('/myusers', userController.getMyUsers)

module.exports = router;
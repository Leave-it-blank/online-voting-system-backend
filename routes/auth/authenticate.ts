import express from 'express';
import controller from '../../controllers/authController';
 
import {auth} from '../../middleware/auth';
const router = express.Router();
//authenticates user
router.post('/login',  controller.login);
router.post('/register', controller.signup);
router.post('/token', controller.refreshToken);
router.post('/logout', auth,controller.logout);
router.get('/me', auth,controller.profile)
//@ts-ignore
export = router;
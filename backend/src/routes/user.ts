import express from 'express'
import signUpController from '../controllers/userController'
import signInController from '../controllers/signinController';

const router=express.Router();

router.post('/signup',signUpController)
router.post('/signin',signInController)

export default router
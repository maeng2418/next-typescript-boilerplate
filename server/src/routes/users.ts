import { Router } from 'express';
import passport from 'passport';
import { UserController } from '@controllers';

const router = Router();

/******************************************************************************
 *                      Auth User - "GET /api/users/"
 ******************************************************************************/
router.get('/', passport.authenticate('jwt', { session: false }), UserController.isValidToken);

/******************************************************************************
 *                       SignUp and SignIn - "POST /api/users/email"
 ******************************************************************************/
router.post('/email', UserController.emailSignIn);
router.post('/email/signup', UserController.emailSignUp);

export default router;

import { Router} from 'express';
import { body } from 'express-validator';
import {UserController} from '../Controllers/UserController';
import { handleInputError } from '../middleware/validatro';

const router = Router();

router.get('/',(req,res)=>{
    res.send('login')
})

router.post('/acount-create',
body('name').notEmpty().withMessage('El nombre es requerido'),
body('email').isEmail().withMessage('El email no es valido'),
body('password').isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
body('password_confirmation').custom((value,{req})=>{
    if(value !== req.body.password){
        throw new Error('Las contraseñas no coinciden')
    }
    return true
}),

handleInputError, UserController.createUser)

router.post('/confirm-token',
body('token').notEmpty().withMessage('El token es requerido'),
handleInputError, UserController.confirmToken)
router.post('/login',
UserController.login)
router.post('/new-token',
    body('email').isEmail().withMessage('El email no es valido'),
handleInputError,
UserController.RequestNewEmail)

export default router;
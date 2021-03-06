import {Router} from "express"
import { login, register } from "../controllers/auth.controller.js"
import {body} from "express-validator"
import { validationResultExpress } from "../middlewares/validationResultExpress.js"
const router = Router()


router.post(
     "/register", 
            [
                body("email", "Formato de email es incorrecto")                    
                    .isEmail()                    
                    .normalizeEmail(),
                body("password", "Error Minimo debe contener la contraseña 6 carácteres")                    
                    .isLength({
                        min:6
                    }),
                body("password", "Formato de contraseña incorrecta")                   
                    .custom((value, {req})=>{
                        if(value !== req.body.repassword){
                            throw new Error("No coinciden las contraseñas")
                        }
                        return value
                    }
                ),
            ],
            validationResultExpress,
            register
    )

router.post(
        "/login",
        [ 
            body("email", "Formato de email es incorrecto")
                .trim()
                .isEmail()
                .normalizeEmail(),
            body("password", "Error Minimo debe contener la contraseña 6 carácteres")
                .trim()
                .isLength({min:6}),
        ],
        validationResultExpress,
        login
)

export default router
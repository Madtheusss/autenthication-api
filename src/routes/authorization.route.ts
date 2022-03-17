import { Request, Response, NextFunction, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authorizationRoute = Router();

authorizationRoute.post('/token', (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError("Tipo de autenticação invalida!")
        }

    } catch (error){
        next(error);
    }

})

export default authorizationRoute;
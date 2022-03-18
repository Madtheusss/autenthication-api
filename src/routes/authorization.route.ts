import { Request, Response, NextFunction, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import UserRepository from "../repositories/user_repository";
import JWT from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError("Tipo de autenticação invalida!")
        }
        //Convertendo conteúdo do Token
        const tokenContent = Buffer.from(token,'base64').toString('utf-8');
        const [username, password] = tokenContent.split(':');

        if(!username || !password){
            throw new ForbiddenError("Credenciais não preenchidas!");
        }

        const user = await UserRepository.findByUsernameAndPassword(username, password);
        
        if(!user){
            throw new ForbiddenError('Usuário ou senha invalido!')
        }

        const jwtPayload = { username: user.username };
        const jwtOptions = { subject: user?.uuid };
        const secretKey = 'my_secret_key';
        
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({ token: jwt});

    } catch (error){
        next(error);
    }

})

export default authorizationRoute;
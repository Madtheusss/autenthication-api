import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const usersRoute = Router();

// Criando um GET /users
usersRoute.get('/users', (req:Request, res:Response, next:NextFunction) => {
    const users = [{ userName: 'Matheus' }];
    res.status(StatusCodes.OK).send(users);
});

// Criando um GET /users/:uuid
usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    
    res.status(StatusCodes.OK).send({ uuid });
});

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    console.log(req.body);

    res.status(StatusCodes.CREATED).send(newUser);
});

export default usersRoute;
import { Router, Request, Response, NextFunction, response } from "express";
import { StatusCodes } from "http-status-codes";
import { nextTick } from "process";

const usersRoute = Router();

// Criando um GET /users
usersRoute.get('/users', (req:Request, res:Response, next:NextFunction) => {
    const users = [{ userName: 'Matheus' }];
    res.status(StatusCodes.OK).send(users);
});

// Buscando um usuario específico GET /users/:uuid
usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    
    res.status(StatusCodes.OK).send({ uuid });
});

//Criando um POST /users
usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    console.log(req.body);

    res.status(StatusCodes.CREATED).send(newUser);
});

//Criando um PUT /users/:uuid
usersRoute.put('/users/:uuid', (req: Request <{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;
    res.status(StatusCodes.OK).send({ modifiedUser });
}); 

//Criando DELETE /users/:uuid
usersRoute.delete('/users/:uuid', (req: Request <{uuid: string}>, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
import { getDataFromToken } from '../../token-actions.js';

export async function ValidateTokenMiddleware(req, res, next){
    next();
    /*
    let token = req.header('Authorization');
    if(!token){
        res.status(401).json()
    }else{
        try {
            token = token.replaceAll("Bearer ", "")
            const session = getDataFromToken(token)
            req.session= session;   
            next();
        }catch (error){
            console.log(error);
            res.status(401).json()
        }  
    }*/
}
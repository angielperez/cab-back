import Usuario from "../models/usuario.js";
import { retornar } from "../helper.js"
import bcrypt from 'bcrypt'
import { createToken } from "../token-actions.js";
class AuthenticationService{
    
    login = async function (request) {
        try {
            const user = await Usuario.findOne({ where: { usuario: request.username } });
            if(user == null) throw "Credenciales invalidas";
            const verification = await bcrypt.compare(request.password, user.clave);
            if(!verification) throw "Credenciales invalidas";
            if(user.estado == 0) throw "Acceso denegado";
            const dataToken = {
                id: user.id,
                username: user.usuario,
            }
            const token = createToken(dataToken);
            return retornar(true, "Acceso exitoso", { token: token}) 
        } catch (error) {
            return retornar(false, error)  
        }
    }
}
 
export default new AuthenticationService();
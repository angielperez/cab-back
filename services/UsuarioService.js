import { retornar } from "../helper.js";
import { Persona } from "../models/persona.js";
import Usuario from "../models/usuario.js";
import bcrypt from 'bcrypt'
class UsuarioService{
    validate = function(request) {
        if(request.usuario == null || request.usuario == "") throw new Error("El nombre de usuario es requerido");
        if(request.clave == null || request.clave == "") throw new Error("La contraseña es requerida");
        if(request.id_persona == null || request.id_persona == "") throw new Error("La persona es requerida");
        if(request.estado == null || request.estado == "") throw new Error("El estado es requerido");

        if(request.usuario.length < 10 || request.usuario.length > 20) throw new Error("El nombre de usuario debe tener entre 10 y 20 caracteres.");
        if(request.clave.length < 10 || request.clave.length > 20) throw new Error("La contraseña debe tener entre 10 y 20 caracteres.");

    }
    create = async function (request) {
        try {
            this.validate(request);
            const password = await bcrypt.hash(request.clave, 10);
            let validation = await this.validateUsernameExist(request.usuario);
            if (validation == true) {
                throw new Error("Nombre de usuario ya existe");
            }

            validation = await this.validatePeopleExist(request.id_persona)
            if (validation == false) {
                throw new Error("Persona asociada no esta registrada");
            }

            const user = Usuario.build({ 
                usuario: request.usuario,
                clave: password,
                id_persona: request.id_persona
            });
            await user.save();
            return retornar(true, "Usuario creado exitosamente")
        } catch (error) {
            return retornar(false, "Ocurrio un error al crear el usuario: " + error)
        }
    }

    update = async function (id, request) {
        try {
            this.validate(request);
            const user = await Usuario.findByPk(id);
            if (user == null) {
                throw new Error("Usuario no existe");
            }
            let validation = null
            if(user.usuario != request.usuario){
                let validation = await this.validateUsernameExist(request.usuario);
                if (validation == true) {
                    throw new Error("Nombre de usuario ya existe");
                }
            }

            validation = await this.validatePeopleExist(request.id_persona)
            if (validation == false) {
                throw new Error("Persona asociada no esta registrada");
            }

            user.id_persona = request.id_persona
            user.usuario = request.usuario
            user.estado = request.estado
            if(request.clave != user.clave){
                user.clave = await bcrypt.hash(request.clave, 10);
            }
            await user.save();
            return retornar(true, "Usuario actualizado exitosamente")
        } catch (error) {
            return retornar(false, "Ocurrio un error al actualizar el usuario: " + error)
        }
    }

    all = async function() {
        let result = await Usuario.findAll({ include: [Persona] });
        return retornar(true, "OK", result)
    }

    find = async function(id) {
        const search = await Usuario.findByPk(id);
        return retornar(true, "OK", search)
    }

    validateUsernameExist = async function(username) {
        const search = await Usuario.findOne({ where: { usuario: username } });
        return search != null
    }

    validatePeopleExist = async function(id_persona) {
        const search = await Persona.findByPk(id_persona);
        return search != null
    }
}
 
export default new UsuarioService();
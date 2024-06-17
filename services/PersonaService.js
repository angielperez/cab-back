import { retornar } from "../helper.js";
import { Persona } from "../models/persona.js";
class PersonaService{
    create = async function (request) {
        try {
            let validation = await this.validateEmailExist(request.correo);
            if (validation == true) {
                throw "Correo electronico ya existe";
            }
            const model = Persona.build(request);
            await model.save();
            return retornar(true, "Persona creada exitosamente")
        } catch (error) {
            return retornar(false, "Ocurrio un error al crear la persona: " + error)
        }
    }

    update = async function (id, request) {
        try {
            const model = await Persona.findByPk(id);
            if (model == null) {
                throw "Persona no existe";
            }
            if(model.correo != request.correo){
                let validation = await this.validateEmailExist(request.correo);
                if (validation == true) {
                    throw "Correo electronico ya existe";
                }
            }

            model.tipo = request.tipo;
            model.identificacion = request.identificacion;
            model.nombres = request.nombres;
            model.apellidos = request.apellidos;
            model.telefono = request.telefono;
            model.correo = request.correo;
            model.direccion = request.direccion;
            model.estado = request.estado;
            await model.save();
            return retornar(true, "Persona actualizada exitosamente")
        } catch (error) {
            return retornar(false, "Ocurrio un error al actualizar a la persona: " + error)
        }
    }

    all = async function() {
        let result = await Persona.findAll();
        return retornar(true, "OK", result)
    }

    find = async function(id) {
        const search = await Persona.findByPk(id);
        return retornar(true, "OK", search)
    }

    validateEmailExist = async function(email) {
        const search = await Persona.findOne({ where: { correo: email } });
        return search != null
    }
}
 
export default new PersonaService();
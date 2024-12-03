import { isEmail, retornar } from "../helper.js";
import { Persona } from "../models/persona.js";
class PersonaService{
    validate = function(request) {
        if(request.tipo == null || request.tipo == "") throw new Error("El tipo es requerido");
        if(request.identificacion == null || request.identificacion == "") throw new Error("La identificacion es requerida");
        if(request.nombres == null || request.nombres == "") throw new Error("El nombres es requerido");
        if(request.apellidos == null || request.apellidos == "") throw new Error("El apellidos es requerido");
        if(request.telefono == null || request.telefono == "") throw new Error("El telefono es requerido");
        if(request.direccion == null || request.direccion == "") throw new Error("La dirección es requerida");
        if(request.correo == null || request.correo == "") throw new Error("El correo es requerido");
        if(request.estado == null || request.estado == "") throw new Error("El estado es requerido");

        validateContinue(request)
    }

    validateContinue(request) {
        if(/^[0-9]*$/.test(request.identificacion) == false) throw new Error("La identificación debe ser numerica");
        if(parseInt(request.identificacion) < 10000 || parseInt(request.identificacion) > 9999999999) throw "La identificacion debe tener entre 5 y 10 caracteres.";
        
        if(request.nombres.length < 10 || request.nombres.length > 20) throw new Error("Los nombres deben tener entre 10 y 20 caracteres.");
        if(request.apellidos.length < 10 || request.apellidos.length > 20) throw new Error("Los apellidos deben tener entre 10 y 20 caracteres.");
        
        if(/^[0-9]*$/.test(request.telefono) == false) throw new Error("El telefono debe ser numerico");
        if(request.telefono.length != 10) throw new Error("El telefono debe tener 10 digitos.");

        if(!isEmail(request.email)) throw new Error("La direccion de correo eléctronico no es valida.");
        
        if(request.direccion.length < 5 || request.direccion.length > 30) throw new Error("La dirección deben tener entre 5 y 30 caracteres.");
    }
    create = async function (request) {
        try {
            this.validate(request);
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
            this.validate(request);
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
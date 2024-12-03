import { retornar } from "../helper.js";
import Excusa from "../models/excusa.js";
import { Horario } from "../models/horario.js";
import { Persona } from "../models/persona.js";
class ExcusaService{
    validate = function(request) {
        if(request.fecha == null || request.fecha == "") throw "Fecha requerida";
        if(request.id_persona == null || request.id_persona == "") throw "Persona es requerida";
        if(request.id_horario == null || request.id_horario == "") throw "Horario es requerido";
        if(request.observaciones == null || request.observaciones == "") throw "Observaciones requeridas";

        if(request.observaciones.length < 5 || request.observaciones.length > 100) throw "Las observaciones deben tener entre 5 y 100 caracteres.";

    }
    create = async function (request) {
        try {
            this.validate(request);
            let validation = await this.validateExcusaExist(request.id_horario);
            if (validation == true) {
                throw "Ya hay una excusa asociada a este horario y persona";
            }
            const model = Excusa.build(request);
            await model.save();
            return retornar(true, "Excusa creada exitosamente")
        } catch (error) {
            return retornar(false, "Ocurrio un error al crear la excusa: " + error)
        }
    }

    update = async function (id, request) {
        try {
            this.validate(request);
            const model = await Excusa.findByPk(id);
            if (model == null) {
                throw "Excusa no existe";
            }
            if(model.id_horario != request.id_horario){
                let validation = await this.validateExcusaExist(request.id_horario);
                if (validation == true) {
                    throw "Ya hay una excusa asociada a este horario y persona";
                }
            }

            model.id_persona = request.id_persona;
            model.id_horario = request.id_horario;
            model.observaciones = request.observaciones;
            model.fecha = request.fecha;
            model.estado = request.estado;
            await model.save();
            return retornar(true, "Excusa actualizada exitosamente")
        } catch (error) {
            return retornar(false, "Ocurrio un error al actualizar la excusa: " + error)
        }
    }

    all = async function() {
        let result = await Excusa.findAll({ include: [Horario, Persona] });
        return retornar(true, "OK", result)
    }

    find = async function(id) {
        const search = await Excusa.findByPk(id);
        return retornar(true, "OK", search)
    }

    validateExcusaExist = async function(id_horario) {
        const search = await Excusa.findOne({ where: { id_horario: id_horario } });
        return search != null
    }
}
 
export default new ExcusaService();
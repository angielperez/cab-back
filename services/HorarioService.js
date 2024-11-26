import { retornar } from "../helper.js";
import { Horario } from "../models/horario.js";
import { Persona } from "../models/persona.js";
class HorarioService{
    createOrUpdate = async function (request) {
        try {
            let validation = await this.validatePeopleExist(request.id_persona)
            if (validation == false) {
                throw "Persona asociada no esta registrada";
            }
            await Horario.destroy({
                where: {
                    id_persona: request.id_persona
                },
            });
            for (let i = 0; i < request.dias.length; i++) {
                const element = request.dias[i];
                if(element.dia == null || element.dia == "") throw "El dia en todos los horarios es requerido";
                if(element.entrada == null || element.entrada == "") throw "La entrada en todos los horarios es requerido";
                if(element.salida == null || element.salida == "") throw "La salida en todos los horarios es requerido";
            }
            for (let i = 0; i < request.dias.length; i++) {
                const element = request.dias[i];
                let model = Horario.build({
                    id_persona: request.id_persona,
                    dia_semana: element.dia,
                    hora_inicio: element.entrada,
                    hora_fin: element.salida
                });
                
                await model.save();
            }
            return retornar(true, "Horario guardado exitosamente")
        } catch (error) {
            return retornar(false, "Ocurrio un error al guardar el horario: " + error)
        }
    }

    findByPeople = async function(id_persona) {
        let result = await Horario.findAll({ where: { 
            id_persona: id_persona,
            estado: 1
        } });
        return retornar(true, "OK", result)
    }
    
    validatePeopleExist = async function(id_persona) {
        const search = await Persona.findByPk(id_persona);
        return search != null
    }
}
 
export default new HorarioService();
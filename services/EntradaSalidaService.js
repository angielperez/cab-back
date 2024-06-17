import { Op } from "sequelize";
import { retornar, sendEmail } from "../helper.js";
import EntradaSalida from "../models/entradaSalida.js";
import { Horario } from "../models/horario.js";
import { Persona } from "../models/persona.js";
class EntradaSalidaService{
    validateAccess = async function (request) {
        try {
            let people = await this.findPeopleByIdentificacion(request.identificacion);
            if (people == null) {
                throw "Numero de identificacion no valido";
            }

            let validHorario = await this.validateHoraryValid(people.id)
            if(!validHorario){
                throw "No se encuentra en un horario valido";
            }
            const model = EntradaSalida.build({ 
                tipo: request.tipo,
                id_persona: people.id
            });
            await model.save();

            let emailRequest = {
                from: 'cabapp09@gmail.com',
                to: people.correo,
                subject: `${request.tipo} en las instalaciones, CAB`,
                text: `Hola, hemos registrado una ${request.tipo} en el sistema, este mensaje queda como constancia de garantia de la accion registrada.`
            }

            sendEmail(emailRequest)

            return retornar(true, `${request.tipo == "ENTRADA" ? "Bienvenido(a)" : "Hasta luego"} ${people.nombres} ${people.apellidos}`)
        } catch (error) {
            return retornar(false, "Acceso denegado: " + error)
        }
    }

    findByDates = async function(request) {
        let inicio = new Date(request.inicio + "T00:00:00")
        let fin = new Date(request.fin + "T23:59:59")
        let result = await EntradaSalida.findAll({ where : {"creacion" : {[Op.between] : [ inicio , fin ]}}, include: [Persona]})
        return retornar(true, "OK", result)
    }

    findPeopleByIdentificacion = async function(identificacion) {
        const search = await Persona.findOne({ where: { identificacion: identificacion } });
        return search
    }

    validateHoraryValid = async function(id_persona){
        let valid = false
        let dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"]
        let fechaActual = new Date();
        let diaSemana = dias[fechaActual.getDay()]
        let hora = fechaActual.getHours()
        let minutos = fechaActual.getMinutes()
        let horarios = await Horario.findAll({ where: { 
            id_persona: id_persona,
            dia_semana: diaSemana,
            estado: 1
        } });

        horarios.forEach(horario => {
            let fechaInicioHorario = new Date();
            let horaInicio = horario.hora_inicio.split(":")[0]
            let minutosInicio = horario.hora_inicio.split(":")[1]
            fechaInicioHorario.setHours(parseInt(horaInicio))
            fechaInicioHorario.setMinutes(parseInt(minutosInicio))

            let fechaFinHorario = new Date();
            let horaFin = horario.hora_fin.split(":")[0]
            let minutosFin = horario.hora_fin.split(":")[1]
            fechaFinHorario.setHours(parseInt(horaFin))
            fechaFinHorario.setMinutes(parseInt(minutosFin))

            if(fechaActual >= fechaInicioHorario && fechaInicioHorario <= fechaFinHorario){
                valid = true
            }
        });
        return valid
    }
}
 
export default new EntradaSalidaService();
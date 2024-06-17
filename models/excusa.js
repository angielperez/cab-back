import { DataTypes } from 'sequelize';
import { connection } from '../database/db.js';
import { Persona } from './persona.js';
import { Horario } from './horario.js';

const Excusa = connection.define(
  'Excusa',
  {
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    id_persona: { 
        type: DataTypes.INTEGER
    },
    id_horario: { 
        type: DataTypes.INTEGER,
    },
    observaciones: { type: DataTypes.STRING },
    fecha: { type: DataTypes.STRING },
    estado: { type: DataTypes.INTEGER },
    creacion: { type: DataTypes.DATE }
  },
  {
    tableName: 'excusa',
    timestamps: false,
  }
);

Excusa.belongsTo(Persona, {
    targetKey: 'id',
    foreignKey:'id_persona'
});

Excusa.belongsTo(Horario, {
    targetKey: 'id',
    foreignKey:'id_horario'
});

export default Excusa
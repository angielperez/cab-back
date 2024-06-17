import { DataTypes } from 'sequelize';
import { connection } from '../database/db.js';

export const Horario = connection.define(
  'Horario',
  {
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    id_persona: { type: DataTypes.INTEGER },
    hora_inicio: { type: DataTypes.STRING },
    hora_fin: { type: DataTypes.STRING },
    dia_semana: { type: DataTypes.STRING },
    estado: { type: DataTypes.INTEGER },
    creacion: { type: DataTypes.DATE }
  },
  {
    tableName: 'horario',
    timestamps: false,
  }
);
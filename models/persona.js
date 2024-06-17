import { DataTypes } from 'sequelize';
import { connection } from '../database/db.js';

export const Persona = connection.define(
  'Persona',
  {
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    tipo: { type: DataTypes.STRING },
    identificacion: { type: DataTypes.STRING },
    nombres: { type: DataTypes.STRING },
    apellidos: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING },
    direccion: { type: DataTypes.STRING },
    estado: { type: DataTypes.INTEGER },
    creacion: { type: DataTypes.DATE }
  },
  {
    tableName: 'persona',
    timestamps: false,
  }
);
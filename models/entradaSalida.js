import { DataTypes } from 'sequelize';
import { connection } from '../database/db.js';
import { Persona } from './persona.js';

const EntradaSalida = connection.define(
  'EntradaSalida',
  {
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    id_persona: { type: DataTypes.INTEGER },
    tipo: { type: DataTypes.STRING },
    estado: { type: DataTypes.INTEGER },
    creacion: { type: DataTypes.DATE }
  },
  {
    tableName: 'entrada_salida',
    timestamps: false,
  }
);

EntradaSalida.belongsTo(Persona, {
  targetKey: 'id',
  foreignKey:'id_persona'
});

export default EntradaSalida;


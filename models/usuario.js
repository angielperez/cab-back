import { DataTypes } from 'sequelize';
import { connection } from '../database/db.js';
import { Persona } from './persona.js';

const Usuario = connection.define(
  'Usuario',
  {
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    },
    id_persona: { type: DataTypes.INTEGER },
    usuario: { type: DataTypes.STRING },
    clave: { type: DataTypes.STRING },
    estado: { type: DataTypes.INTEGER },
    creacion: { type: DataTypes.DATE }
  },
  {
    tableName: 'usuario',
    timestamps: false,
  }
);

Usuario.belongsTo(Persona, {
  targetKey: 'id',
  foreignKey:'id_persona'
});

export default Usuario;
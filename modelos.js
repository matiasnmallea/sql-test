

//const Sequelize = require('sequelize');//comentado para borrar 19/6

const{Sequelize,Model,DataTypes}=require('sequelize');

const options={loggin: false};//para no hacer login //super borrador en desarrollo
const sequelizelogistica = new Sequelize("sqlite:dblogistica.sqlite",options);//especifico tipo de DDBB

const sequelizeusers = new Sequelize("sqlite:database.sqlite3",options);//especifico tipo de DDBB

class User extends Model{};
User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
  
   username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
    },
  {
    //timestamps: false,
    sequelize: sequelizeusers,
     modelName:"User"
    }
  
);

class Choferes extends Model{}
Choferes.init(
   {//estructura de tabla
       id_chofer:   {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,//aca agregamos que esta es primaryKey
    },
       nombre:      DataTypes.STRING,  
       apellido:    DataTypes.STRING,
       dni:         DataTypes.STRING,
       licencia:    DataTypes.STRING,
       edad:        DataTypes.INTEGER,
       
   },
   {
    timestamps: false,
    sequelize: sequelizelogistica,
     modelName:"Choferes"
    }    
);

class Vehiculos extends Model{}
Vehiculos.init(
   {//estructura de tabla
       id_vehiculo: {
        type: DataTypes.INTEGER ,
        allowNull: false,
        primaryKey: true,//aca agregamos que esta es primaryKey
    },  
       patente:      DataTypes.STRING,  
       carga_util:    DataTypes.REAL,
       licencia_minima:    DataTypes.STRING,
       en_uso:        DataTypes.INTEGER,
   },
   
   {
    timestamps: false,
    sequelize: sequelizelogistica,
     modelName:"Vehiculos"
    }
);

//Podria ser un alias de  relacion , pero no se puede llenar con bulkCreate sino.
const Habilitaciones = sequelizelogistica.define('Habilitaciones', {
    id_chofer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    id_vehiculo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
},
{
    timestamps: false,
    sequelize: sequelizelogistica,
     modelName:"Habilitaciones"
    }
);

Choferes.belongsToMany(Vehiculos,{
    as:'Puede conducir',//nombre de la relacion de ida
    foreignKey: 'id_chofer',// extranjera de origen
    otherKey:'id_vehiculo',//extranjera de llegada
    through:'Habilitaciones' //Nombre de la tabla intermedia
});

Vehiculos.belongsToMany(Choferes,{
    as:'Puede ser conducido por',//nombre de la relacion de ida
    foreignKey: 'id_vehiculo',// extranjera de origen
    otherKey:'id_chofer',//extranjera de llegada
    through:'Habilitaciones' //Nombre de la tabla intermedia
});




module.exports = {
  sequelizeusers,
  sequelizelogistica,
  User,
  Choferes,
  Vehiculos,
  Habilitaciones
};
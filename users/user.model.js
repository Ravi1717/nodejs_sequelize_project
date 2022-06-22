const sequelize = require("sequelize");

const {DataTypes} = sequelize;

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName :{
            type: DataTypes.STRING, allowNull: false
        },
        lastName:{
            type: DataTypes.STRING, allowNull: false
        },
        username:{
            type:DataTypes.STRING, allowNull:false
        },
        password:{
            type:DataTypes.STRING, allowNull:false
        }
    };

    const options = {
        defaultScope :{
            //exclude hash by default
            attributes: {exclude: ['password']}
        },
        scopes:{
            //include hash with this scope
            withHash: {attributes:{},}
        }
    };

    return sequelize.define("User", attributes, options);
}
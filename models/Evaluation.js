const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");


class Evaluation extends Model{
    static id;
    static adaptablity_to_change;
    static safe_conduct;
    static dynamism_energy;
    static personal_effectiveness;
    static initiative;
    static working_under_pressure;
    static date;
}

Evaluation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    worker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Workers',
            key: 'id'
        }
    },
    adaptablity_to_change: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    safe_conduct: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dynamism_energy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    personal_effectiveness: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    initiative: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    working_under_pressure: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
}, {
    sequelize: db,
    modelName: 'Evaluation',
});

module.exports = Evaluation;
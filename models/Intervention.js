const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");




class Intervention extends Model{
    static id;
    static date;
    static activityName;
    static details;
    static start_date;
    static end_date;
    static status;
    static file_path;
}

Intervention.init({
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
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    activityName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_path: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Intervention',
});

module.exports = Intervention;
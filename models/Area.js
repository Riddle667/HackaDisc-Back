const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");
const Post = require("./Post");
const Company = require("./Company");



class Area extends Model{
    static id;
    static name;  
}

Area.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db,
    modelName: 'Area',
});

Area.belongsTo(Company, {
    foreignKey: 'company_id'
});

module.exports = Area;
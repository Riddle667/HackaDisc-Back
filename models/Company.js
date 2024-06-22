const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");
const Area = require("./Area");



class Company extends Model {
    static id;
    static name;
}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize: db,
    modelName: 'Companies'
});

Company.belongsToMany(Company, {
    through: 'MultiCompany',
    as: 'MainCompanies',
    foreignKey: 'main_company_id',
    otherKey: 'sub_company_id',
  });
  
  Company.belongsToMany(Company, {
    through: 'MultiCompany',
    as: 'SubCompanies',
    foreignKey: 'sub_company_id',
    otherKey: 'main_company_id',
  });


module.exports = Company;
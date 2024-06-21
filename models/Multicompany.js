const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");



class Multicompany extends Model{
    static main_company_id;
    static sub_company_id;
}

Multicompany.init({
    main_company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Companies',
            key: 'id'
        }
    },
    sub_company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Companies',
            key: 'id'
        }
    }
}, {
    sequelize: db,
    modelName: 'Multicompanies',
});

module.exports = Multicompany;
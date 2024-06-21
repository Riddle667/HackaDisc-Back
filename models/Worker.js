const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");
const Intervention = require("./Intervention");
const Evaluation = require("./Evaluation");
const Post = require("./Post");
const Company = require("./Company");

class Worker extends Model{
    static id;
    static name;
}

Worker.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Posts',
            key: 'id'
        }
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Companies',
            key: 'id'
        }
    },
}, {
    sequelize: db,
    modelName: 'Worker',
});

Worker.hasMany(Intervention, {
    foreignKey: 'worker_id'
})

Worker.hasMany(Evaluation, {
    foreignKey: 'worker_id'
});

Worker.belongsTo(Post, {
    foreignKey: 'post_id'
});

Worker.belongsTo(Company, {
    foreignKey: 'company_id'
});


module.exports = Worker;
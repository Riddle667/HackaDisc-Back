const { Model, DataTypes } = require("sequelize");
const db = require("../database/connection");
const Area = require("./Area");

class Post extends Model{
    static id;
    static name;
}

Post.init({
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
    modelName: 'Posts',
});

Post.belongsTo(Area, {
    foreignKey: 'area_id'
})

module.exports = Post;
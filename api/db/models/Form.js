'use strict';
module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define(
        'Form',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Required: {
                type: DataTypes.STRING,
                allowNull: true
            },
            links: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            freezeTableName: true
        }
    );
    Form.associate = function(models) {
        // associations can be defined here
    };
    return Form;
};

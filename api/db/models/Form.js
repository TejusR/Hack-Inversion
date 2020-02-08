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
                type: DataTypes.TEXT,
                get: function () {
                    return JSON.parse(this.getDataValue('value'));
                },
                set: function (value) {
                    this.setDataValue('value', JSON.stringify(value));
                }
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

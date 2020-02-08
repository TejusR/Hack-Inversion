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
                    return JSON.parse(this.getDataValue('Required'));
                },
                set: function (value) {
                    console.log(value);
                    this.setDataValue('Required', JSON.stringify(value));
                }
            },
            links: {
                type: DataTypes.TEXT,
                get: function () {
                    return JSON.parse(this.getDataValue('links'));
                },
                set: function (value) {
                    console.log(value);
                    this.setDataValue('links', JSON.stringify(value));
                }
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

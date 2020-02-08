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
                get: function() {
                    return JSON.parse(this.getDataValue('Required'));
                },
                set: function(value) {
                    this.setDataValue('Required', JSON.stringify(value));
                }
            },
            links: {
                type: DataTypes.TEXT,
                get: function() {
                    return JSON.parse(this.getDataValue('links'));
                },
                set: function(value) {
                    this.setDataValue('links', JSON.stringify(value));
                }
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Sequelize.NOW()
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
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

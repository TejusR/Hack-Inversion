'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Form', {
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
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};

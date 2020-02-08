'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('Form', 'links', {
            type: Sequelize.TEXT,
            get: function () {
                return JSON.parse(this.getDataValue('value'));
            },
            set: function (value) {
                this.setDataValue('value', JSON.stringify(value));
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserForm');
    }
};
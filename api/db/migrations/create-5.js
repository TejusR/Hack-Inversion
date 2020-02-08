'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Users', 'wallet', {
            type: Sequelize.FLOAT,
            defaultValue: 0,
        })
    },
    down: (queryInterface, Sequelize) => {}
}
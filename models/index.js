import Sequelize from 'sequelize'

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
})

const models = {
    Channel: sequelize.import('./channel'),
    Member: sequelize.import('./member'),
    Message: sequelize.import('./message'),
    Team: sequelize.import('./team'),
    User: sequelize.import('./user'),
}

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
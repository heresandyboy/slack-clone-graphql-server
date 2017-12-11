import Sequelize from 'sequelize'

const sequelize = new Sequelize(config.database, config.username, config.password)

const models = {
    user: sequelize.import('./models'),
}

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
import express from 'express'
import bodyParser from 'body-parser'
import {
    graphqlExpress,
    graphiqlExpress,
} from 'apollo-server-express'
import {
    makeExecutableSchema,
} from 'graphql-tools'

import typeDefs from './schema'
import resolvers from './resolvers'
import models from './models'

const PORT = 8080

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const app = express()
const graphqlEndpoint = '/graphql'
const graphiqlEndpoint = '/graphiql'

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({
    schema,
}))
app.use(graphiqlEndpoint, graphiqlExpress({
    endpointURL: graphqlEndpoint,
}))

// Force drop and create database to start fresh
models.sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT)
    })

// models.sequelize.sync()
//     .then(() => {
//         app.listen(PORT)
//     })
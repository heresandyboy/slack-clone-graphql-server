import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import {
    graphqlExpress,
    graphiqlExpress,
} from 'apollo-server-express'
import {
    makeExecutableSchema,
} from 'graphql-tools'
import {
    fileLoader,
    mergeTypes,
    mergeResolvers,
} from 'merge-graphql-schemas'
import cors from 'cors'

import models from './models'

const PORT = 8080

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const app = express()

app.use(cors('*'))

const graphqlEndpoint = '/graphql'
const graphiqlEndpoint = '/graphiql'

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({
    schema,
    context: {
        models,
        user: {
            id: 1,
        },
    },
}))
app.use(graphiqlEndpoint, graphiqlExpress({
    endpointURL: graphqlEndpoint,
}))

// Force drop and create database to start fresh
const force = false

models.sequelize.sync({ force })
    .then(() => {
        app.listen(PORT)
    })
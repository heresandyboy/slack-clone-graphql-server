import bcrypt from 'bcrypt'
import _ from 'lodash'

import {
    tryLogin
} from '../auth'

const formatErrors = (error, models) => {
    if (error instanceof models.sequelize.ValidationError) {
        // lodash pick:  _.pick({a: 1, b: 2}, 'a') => {a: 1}
        return error.errors.map(x => _.pick(x, ['path', 'message']))
    }
    return [{
        path: 'name',
        message: 'something went wrong'
    }]
}

const passwordIsValid = password => (password.length >= 5 && password.length <= 100)

const passwordValidationError = {
    ok: false,
    errors: [{
        path: 'password',
        message: 'The password should be between 5 and 100 characters'
    }]
}

export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll()
    },
    Mutation: {
        login: (parent, {
            email,
            password
        }, { models, SECRET }) => tryLogin(email, password, models, SECRET),
        register: async (parent, {
            password,
            ...otherArgs
        }, { models }) => {
            try {
                if (!passwordIsValid(password)) {
                    return passwordValidationError
                }

                const hashedPassword = await bcrypt.hash(password, 12)
                const user = await models.User.create({
                    ...otherArgs,
                    password: hashedPassword
                })
                return {
                    ok: true,
                    user
                }
            } catch (error) {
                console.log(error)
                return {
                    ok: false,
                    errors: formatErrors(error, models)
                }
            }
        }
    }
}
const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')


const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__V -password')
                    .populate('savedBooks')

                    return userData;
            }
            throw new AuthenticationError('not logged in')
        },
        users: async() => {
            return User.find()
            .select('-__V -password')
            .populate('friends')
            .populate('thoughts');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user }
        },
        login: async (parents, { email, password}) => {
            const user = await User.findOne({ email })

            if(!user) {
                throw new AuthenticationError('incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password)

            if(!correctPw) {
                throw new AuthenticationError('incorrect credentials')
            }

            const token = signToken(user);
            return { token, user}
        },
        saveBook: async (parent, { input }, context) => {
            if(context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $push: { savedBooks: input }},
                    { new: true}
                )

                return updateUser;
            }

            throw new AuthenticationError('you need to be logged in!')
        },

        removeBook: async (parent, { bookId }, context) => {
            if(context.user) {
                if(context.user) {
                    const updateUser = await User.findByIdAndUpdate(
                        { _id: context.user._id},
                        { $pull: { savedBooks: { bookId: bookId }}},
                        { new: true}
                    )
    
                    return updateUser;
                }
            }

            throw new AuthenticationError('you need to be logged in!')
        }
        
    },
}

const User = require('./user.model')

exports.createUser = async (body) => {
    const oldUser = await User.getUserByUserId(body.userId)
    if(oldUser) {
        return [400, "user already exists", {}]
    }
    const user = await User.create(body);
    return [200, "user created", user]
}
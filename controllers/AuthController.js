const { User } = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');

exports.signup = async (_, { username, email, password }) => {
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new AuthenticationError('User already exist');

    const user = new User({ username, email, password });
    const savedUser = await user.save();

    return savedUser;
  } catch (err) {
    throw err;
  }
};

exports.login = async (_, { username, password }) => {
  try {
    const user = await User.findOne({ username });
    if (!user) throw new AuthenticationError('User not found');

    const validPassword = await user.isValidPassword(password);
    if (!validPassword) throw new AuthenticationError('Invalid Password');

    let token = user.generateJWT();
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token
    }
  } catch (err) {
    throw err;
  }
}
const TodoController = require('../controllers/TodoController');
const AuthController = require('../controllers/AuthController');

const { Todo } = require('../models/Todo');
const { User } = require('../models/User');

exports.resolvers = {
  Query: {
    todos: () => Todo.find({}),
    users: () => User.find({})
  },
  Mutation: {
    login: AuthController.login,
    signup: AuthController.signup,

    addTodo: TodoController.addTodo,
    deleteTodo: TodoController.deleteTodo,
    toggleTodo: TodoController.toggleTodo,
  }
}
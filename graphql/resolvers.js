const TodoController = require('../controllers/TodoController');
const AuthController = require('../controllers/AuthController');

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
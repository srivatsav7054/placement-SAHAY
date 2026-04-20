const Todo = require("../models/Todo");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const listTodos = asyncHandler(async (req, res) => {
  const filter = req.query.userId ? { userId: req.query.userId } : {};
  const todos = await Todo.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: todos });
});

const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({ success: true, data: todo });
});

const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  res.json({ success: true, data: todo });
});

const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  res.json({ success: true, data: todo });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    throw new ApiError(404, "Todo not found");
  }
  res.json({ success: true, message: "Todo deleted successfully" });
});

module.exports = {
  listTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
};

const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");


// GET all user todos
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user });
  res.json(todos);
});


// ADD todo
router.post("/", auth, async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    userId: req.user
  });

  await newTodo.save();
  res.json(newTodo);
});


// TOGGLE complete
router.put("/:id", auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.completed = !todo.completed;

  await todo.save();

  res.json(todo);
});


// DELETE todo
router.delete("/:id", auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
import userModel from "../models/userModel.js";

export const addTodo = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description, priority, completed } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    // create a todo object
    const newTodo = {
      title,
      description,
      priority,
      completed,
    };

    // push the new todo into user's todo array
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $push: { todo: newTodo } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(201).json({
      success: true,
      message: "Todo added successfully",
      todo: user.todo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("todo");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, todos: user.todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;
    const { title, description, priority, completed } = req.body;
    console.log(todoId);

    if (!title || !description) {
      return res.status(409).json({
        success: false,
        message: "missing fields, enter all required fields",
      });
    }
    // Update the specific todo inside the user's todo array
    const user = await userModel.findOneAndUpdate(
      { _id: userId, "todo._id": todoId },
      {
        $set: {
          "todo.$.title": title,
          "todo.$.description": description,
          "todo.$.completed": completed,
          "todo.$.priority": priority,
        },
      },
      { new: true }
    );
    console.log(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todos: user.todo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const todo = user.todo.id(todoId); // find todo inside user's array
    console.log(todoId);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.deleteOne(); // ✅ safe now
    await user.save();

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      todos: user.todo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markTodoComplete = async (req, res) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id; // ✅ make sure to destructure .id not whole params

    const user = await userModel.findOneAndUpdate(
      { _id: userId, "todo._id": todoId },
      { $set: { "todo.$.completed": true } },
      { new: true } // return updated doc
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo marked as completed",
      todos: user.todo,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

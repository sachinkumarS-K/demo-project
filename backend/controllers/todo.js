const Todo = require("../models/todoSchema");
const User = require("../models/userModel")

exports.createTodo = async (req, res) => {
    const { title, task } = req.body;
    const userId = req.user.id;
    console.log(userId)
    const newTodo = await Todo.create({
        title,
        task
    });
  
    const user = await User.findByIdAndUpdate({_id: userId}, { $push: { todos: newTodo._id } } , {new : true});
    return res.json({
        sucess: true,
        user,
        newTodo
    })
}
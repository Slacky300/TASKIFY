const Task = require('../models/task.model');
const User = require('../models/user.model');

const createTask = async (req, res) => {

    try {
        const {
            title,
            description
        } = req.body;
        const newTask = await Task.create({
            title,
            description,
            creator: req.user.id
        });

        const user = await User.findById(req.user.id);
        user.tasks_created.push(newTask._id);
        await user.save();

        res.status(201).json({
            task: newTask,
            message: "Task created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

const getTasks = async (req, res) => {

    try {
        const tasks = await Task.find({
            creator: req.user.id
        });
        res.status(200).json({
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

const getTask = async (req, res) => {

    try {
        const {taskId} = req.params;
        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({
            message: "Task not found"
        });
        res.status(200).json({
            task
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}  

const updateTask = async (req, res) => {

    try {
        const {taskId} = req.params;
        const {
            title,
            description
        } = req.body;

       const doesTaskExists = await Task.findById(taskId);
        if (!doesTaskExists) return res.status(404).json({
            message: "Task not found"
        });

        if (doesTaskExists.creator.toString() !== req.user.id) return res.status(401).json({
            message: "You're not authorized to edit this task"
        });

        doesTaskExists.title = title;
        doesTaskExists.description = description;
        await doesTaskExists.save();

        res.status(200).json({
            message: "Task updated successfully",
            task: doesTaskExists
        });

       
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

} 

const deleteTask = async (req, res) => {

    try {
        const {taskId} = req.params;
        const doesTaskExists = await Task.findById(taskId);
        if (!doesTaskExists) return res.status(404).json({
            message: "Task not found"
        });

        if (doesTaskExists.creator.toString() !== req.user.id) return res.status(401).json({
            message: "You're not authorized to delete this task"
        });

        const user = await User.findById(req.user.id);
        user.tasks = user.tasks_created.filter(task => task.toString() !== taskId);
        await user.save();

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

const completeTask = async (req, res) => {

    try {

        const {taskId} = req.params;

        const doesTaskExists = await Task.findById(taskId);

        if (!doesTaskExists) return res.status(404).json({
            message: "Task not found"
        });

        if (doesTaskExists.creator.toString() !== req.user.id) return res.status(401).json({
            message: "You're not authorized to complete this task"
        });

        doesTaskExists.completed = true;
        await doesTaskExists.save();

        res.status(200).json({
            message: "Task completed successfully"
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

}

const getTasksInsights = async (req, res) => {
    console.log("getTasksInsights");
    try {
        const tasks = await Task.find({
            creator: req.user.id
        });

        const completedTasks = tasks.filter(task => task.completed === true);
        const incompleteTasks = tasks.filter(task => task.completed === false);

        res.status(200).json({
            completedTasks: {
                count: completedTasks.length,
                tasks: completedTasks
            },
            incompleteTasks:{
                count: incompleteTasks.length,
                tasks: incompleteTasks
            }
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    completeTask,
    getTasksInsights
}
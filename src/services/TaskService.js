const { Project, Task } = require("../models/models")
const { validationRequestTask, validationTimeOverlaps } = require("../validation/validation")

const createTask = async (req, res) => {
    const { title, description, startTime, endTime } = req.body
    const { projectId } = req.params

    try {
        validationRequestTask(req.body)
        const project = await Project.findById(projectId).populate("tasks")
        if (!project) return res.status(404).json({message:"Project not found"});

        validationTimeOverlaps(project, req.body)

        const newTask = new Task({
            title,
            description,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        });
   
        const savedTask = await newTask.save();

        project.tasks.push(savedTask._id);
        project.save();

        return res.status(201).json(savedTask);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllTask = async (req, res) => {
    const { projectId } = req.params
    try {
        const project = await Project.findById(projectId).populate("tasks")
        if (!project) return res.status(404).json({message:"Project not found"});

        const { tasks } = project

        console.log(tasks)
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const updateTask = async (req, res) => {
    const taskId = req.params.id
    try {
        validationRequestTask(req.body)
        const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true })
        if (!task) return res.status(404).json({message:"Task not found"});
        validationTimeOverlaps(project, req.body)

        return res.status(200).json(task)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deteleTask = async (req, res) => {
    const taskId = req.params.id
    try {
        const task = await Task.findById(taskId)
        if (!task) return res.status(404).json({message:"Task not found"});

        const project = await Project.findOne({ tasks: taskId}) // find project from taskId
        const taskIndex = project.tasks.indexOf(taskId); // find index from taskId

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found in project' });
        }

        project.tasks.splice(taskIndex, 1) //delete task from task list in project model;
        await project.save();
        await task.deleteOne();
        
        return res.status(200).json({message:"Task deleted"})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const makeTaskDone = async (req, res) => {
    const taskId = req.params.id
    try {
        const task = await Task.findById(taskId)
        if (!task) return res.status(404).json({message:"Task not found"});

        task.status = 'DONE'
        task.save()
        return res.status(200).json({message : `Task ID : ${task._id} changes status to DONE`})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getTaskOpen = async (req, res) => {
    try {
        const task = await Task.find({status: "OPEN"})
        return res.status(200).json(task)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    getAllTask,
    updateTask,
    deteleTask,
    makeTaskDone,
    getTaskOpen
}
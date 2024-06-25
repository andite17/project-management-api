const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    startTime: { 
        type: Date, 
        required: true },
    endTime: { 
        type: Date, 
        required: true 
    },
    status: {
        type: String,
        enum: ['OPEN', 'DONE'],
        default: 'OPEN'
    }
})

const Project = mongoose.model("Project", ProjectSchema)
const Task = mongoose.model("Task", TaskSchema)

module.exports = {
    Project,
    Task
}
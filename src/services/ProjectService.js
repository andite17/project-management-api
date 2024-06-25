const { Project } = require("../models/models")

const createProject = async (req, res) => {
    try {
        const newProject = new Project({...req.body})
        const insertProject = await newProject.save()
        return res.status(201).json(insertProject)
    } catch (error) {
        console.log(error)
        return res.status(400).send({message: error.message})
    }
}

const getAllProject = async (req, res) => {
    const allProject = await Project.find()
    return res.status(200).json(allProject)
}

const getProjectById = async (req, res) => {
    const { id } = req.params
    try {
        const project = await Project.findById(id)
        if (!project) return res.status(404).json({message:"project not found"});
        return res.status(200).json(project)
    } catch (error) {
        return res.status(400).send(error)
    }
}

const updateProjectById = async (req, res) => {
    const { id } = req.params
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        return res.status(200).json(updatedProject);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const deleteProjectById = async (req, res) => {
    const { id } = req.params
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createProject,
    getAllProject,
    getProjectById,
    updateProjectById,
    deleteProjectById
}
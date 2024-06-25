const { Router } = require("express")
const { createProject, getAllProject, getProjectById, updateProjectById, deleteProjectById} = require("../services/ProjectService")
const { createTask, getAllTask, updateTask, deteleTask, makeTaskDone, getTaskOpen} = require("../services/TaskService")

const router = Router()

// Project Routes
router.post("/projects",createProject)
router.get("/projects", getAllProject)
router.get("/projects/:id", getProjectById)
router.put("/projects/:id", updateProjectById)
router.delete("/projects/:id", deleteProjectById)


// Task Routes
router.post("/projects/:projectId/tasks", createTask)
router.get("/projects/:projectId/tasks", getAllTask)
router.put("/tasks/:id", updateTask)
router.delete("/tasks/:id", deteleTask)
router.put("/tasks/:id/done", makeTaskDone)
router.get("/tasks/open", getTaskOpen)


module.exports = router
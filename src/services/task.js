const Task = require('../models/task');
const crudOptions = require('../utils/crud');

const getTasks = async (req, res) => {
    try {       
        const dataJson = await crudOptions.readFile('./tasks.json');
        res.send(JSON.parse(dataJson));
    }
    catch (e) {
        res.status(500).send([]);
    }
}

const createTask = async (req, res) => {
    try {
        const tasks = await crudOptions.readFile('./tasks.json');
        var tasksArray = tasks ? JSON.parse(tasks) : [];
        tasksArray.push(req.body);

        const dataJson = await crudOptions.writeFile('./tasks.json', tasksArray, 'utf-8');
        res.send(dataJson);
    }
    catch (e) {
        res.status(500).send([]);
    }
}

const updateTask = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        return (!task) ? res.status(404).send() : res.send(task);
    }
    catch (e) {
        res.status(400).send(e);
    }
}

const deleteTask = async (req, res) => {
    try {
        const tasks = await crudOptions.readFile('./tasks.json');
        const taskArray = JSON.parse(tasks);
        const tasksToKeep = taskArray.filter((task) => {
            return task['description'] !== req.body.description
        })

        //var tasksArray = tasks ? JSON.parse(tasks) : [];
        //tasksArray.push(req.body);

        const dataJson = await crudOptions.writeFile('./tasks.json', tasksToKeep, 'utf-8');
        res.send(dataJson);
    } catch (e) {
        res.status(500).send()
    }
}

const getTaskById = (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        return (!task) ? res.status(404).send() : res.send(task);
    }).catch((e) => {
        res.status(500).send();
    })
}

module.exports = taskCruds = {
    getTasks: getTasks,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask
}
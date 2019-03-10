import { Task } from './models/task';

export const getTasks = async (req, res) => {
    try {
        const users = await Task.find({});
        res.send(tasks);
    }
    catch (e) {
        res.status(500).send();
    }
}

export const createTask = (req, res) => {

    const task = new Task(req.body);
    task.save().then(() => {
        res.send(task);
    }).catch((e) => {
        res.status(400).send(e)
    });
}

export const getTaskById = (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        return (!task) ? res.status(404).send() : res.send(task);
    }).catch((e) => {
        res.status(500).send();
    })
}

export const updateTask = async (req, res) => {
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

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        return (!task) ? res.status(404).send() : res.send(task);
    } catch (e) {
        res.status(500).send()
    }
}
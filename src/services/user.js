import { User } from './models/user';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    }
    catch (e) {
        res.status(500).send();
    }
}

export const createUser = (req, res) => {

    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e)
    });
}

export const getUserById = (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        return (!user) ? res.status(404).send() : res.send(user);
    }).catch((e) => {
        res.status(500).send();
    })
}

export const updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        return (!user) ? res.status(404).send() : res.send(user);
    }
    catch (e) {
        res.status(400).send(e);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        return (!user) ? res.status(404).send() : res.send(user);
    } catch (e) {
        res.status(500).send()
    }
}
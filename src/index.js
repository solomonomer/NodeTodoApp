const express = require('express') //web application framework to help organize your web application into an MVC architecture on the server side.
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

// automaticlly parse incoming json to an object so we can access it in our request handlers
app.use(express.json())

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;


    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.post('/users', (req, res) => {

    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e)
    });
})

app.post('/tasks', (req, res) => {

    const task = new Task(req.body);
    task.save().then(() => {
        res.send(task);
    }).catch((e) => {
        res.status(400).send(e)
    });
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(3000, () => {
    console.log("app listening on port 3000")
})
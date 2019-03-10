//const userRoute = require('./user');
const taskRouter = require('./task');


module.exports = [
    {
        route: taskRouter,
        path: '/tasks/'
    }
]
const express = require('express') //web application framework to help organize your web application into an MVC architecture on the server side.
require('./db/mongoose')
const userRouter = require ('./routers/user')
const taskRouter = require ('./routers/task')


const app = express()
const port = process.env.PORT || 3000

// automaticlly parse incoming json to an object so we can access it in our request handlers
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("app listening on port " + port)
})
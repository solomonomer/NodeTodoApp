
import express from 'express';
import './db/mongoose';

const app = express();
const port = process.env.PORT || 3000

// automaticlly parse incoming json to an object so we can access it in our request handlers
app.use(express.json());

routers.forEach(route => {
    app.use(route.path, route, route);
})

app.listen(port, () => {
    console.log("app listening on port ${port}");
})
import userRouter from './user';
import taskRouter from './task';

export const routers = [
    {
        route: taskRouter,
        path: '/tasks'
    },
    {
        route: userRouter,
        path: '/users'
    }
]
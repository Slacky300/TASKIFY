const router = require('express').Router();

const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
    completeTask,
    getTasksInsights
} = require('../controllers/task.controller');

const {
    validateToken
} = require('../middlewares/auth.middleware');

router.get('/insights',validateToken, getTasksInsights);

router.route('/')
    .post(validateToken, createTask)
    .get(validateToken, getTasks);

router.route('/:taskId')
    .get(validateToken, getTask)
    .put(validateToken, updateTask)
    .delete(validateToken, deleteTask)
    .patch(validateToken, completeTask);



module.exports = router;
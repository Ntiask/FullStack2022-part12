const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

const { getAsync, setAsync } = require('../redis');
const configs = require('../util/config');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findById(id)
  res.send(todo)
});

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const todo = await Todo.findByIdAndUpdate(id, {text: req.body.text, done: req.body.done})
  res.send(todo._id)
});


/* POST todo to listing. and add to counter on redis*/
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  
  const now = parseInt(await getAsync(configs.REDIS_KEY1));
  const total = isNaN(now) ? 1 : now + 1;
  await setAsync(configs.REDIS_KEY1, total);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

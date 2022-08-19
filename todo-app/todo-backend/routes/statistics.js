
const configs = require('../util/config');
const { getAsync } = require('../redis');
const express = require('express');
const router = express.Router();


router.get('/', async (_req, res) => {
  const now = parseInt(await getAsync(configs.REDIS_KEY1));
  const total = isNaN(now) ? 0 : now;
  res.send({
    'added_todos': total
  });
});

module.exports = router;
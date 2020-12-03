const express = require('express');
const userDb = require('./userDb')
const postDb = require('../posts/postDb')
const middlewares = require('../middlewares/middlewares')

const router = express.Router();

router.post('/', middlewares.validateUser, async (req, res) => {
  try {
    const newUser = await userDb.insert(req.body)
    res.status(201).json(newUser)
  }
  catch(error) {
    next(error)
  }

});

router.post('/:id/posts', middlewares.validateUserId, middlewares.validatePost, async (req, res) => {
  const { id } = req.params
  try {
    const newPost = await postDb.insert({...req.body, user_id:id})
    res.status(201).json(newPost)
  }
  catch(error) {
    next(error)
  }
});

router.get('/', (req, res) => {
  userDb.get()
  .then(results => {
    res.status(200).json(results)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id', middlewares.validateUserId, (req, res) => {
  res.status(200).json(req.userInfo)
});

router.get('/:id/posts', middlewares.validateUserId, (req, res) => {
  const { id } = req.params
  userDb.getUserPosts(id)
  .then(results => {
    res.status(200).json(results)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', middlewares.validateUserId, async (req, res) => {
  const { id } = req.params
  try {
    await userDb.remove(id)
    res.json(req.userInfo)
  }
  catch(error) {
    next(error)
  }
});

router.put('/:id', middlewares.validateUserId, middlewares.validateUser, (req, res) => {
  const { id } = req.params
  userDb.update(id, req.body)
  .then(results => {
    if (results) {
      res.status(201).json({id:Number(id), name:req.body.name})
    } else {
      res.status(400).json({message:"Failed to update database"})
    }
  })
  .catch(error => {
    next(error)
  })
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message:'Something has happened, unable to access database',
    error: err.message
  })
})


module.exports = router;

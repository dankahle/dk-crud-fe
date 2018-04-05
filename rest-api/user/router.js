
const express = require('express'),
  ctrl = require('./controller');

router = express.Router();
module.exports = router;


router.get('/', function(req, res, next){
  ctrl.getAll()
    .then(users => res.send(users))
    .catch(next);
})

router.get('/:id', function(req, res, next){
  ctrl.getOne(req.params.id)
    .then(user => {
      if (user) {
        res.send(user);
      }
      res.status(404).end();
    })
    .catch(next)
})

router.post('/', function(req, res, next) {
  ctrl.add(req.body)
    .then(user => res.send(user))
    .catch(next);
})

router.put('/:id', function(req, res, next) {
  ctrl.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.send(user);
      }
      res.sendStatus(404);
    })
    .catch(next)
})

router.delete('/:id', function(req, res, next){
  ctrl.remove(req.params.id)
    .then(() => res.sendStatus(204));
})


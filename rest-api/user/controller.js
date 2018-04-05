const express = require('express'),
  repo = require('./repo');

exports.getAll = function (req, res, next) {
  repo.getAll()
    .then(users => res.send(users))
    .catch(next);
}

exports.addOne = function (req, res, next) {
  const user = req.body;
  repo.addOne(user)
    .then(_user => res.send(_user))
    .catch(next);
}

exports.getOne = function (req, res, next)
{
  repo.getOne(req.params.id)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).end();
      }
    })
    .catch(next)
}

exports.updateOne = function(req, res, next)
{
  repo.updateOne(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next)
}

exports.removeOne = function(req, res, next)
{
  repo.removeOne(req.params.id)
    .then(() => res.sendStatus(204));
}


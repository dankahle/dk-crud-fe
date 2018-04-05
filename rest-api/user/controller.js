const _ = require('lodash'),
  User = require('./model');

var users = [
  {id: 1, name: 'dank', age: 50},
  {id: 2, name: 'carl', age: 60},
  {id: 3, name: 'jim', age: 40},
]

exports.getAll = function() {
  return User.find()
    .sort('name')
    .exec()
}

exports.getOne = function(id){
	return User.findById(id).exec();
}

exports.add = function(user) {
  return User.create(user);
}

exports.update = function(id, body) {
  return User.replaceOne({_id: id}, body)
    .then(() => User.findById(id).exec())
}

exports.remove = function(id) {
  return User.remove({_id: id}).exec()
    .then(x => {
      return x;
    })
}

function getNextUserId() {
  return _.max(_.map(users, 'id')) + 1;
}

function getOneUser(id) {
  return _.find(users, {id: Number(id)});
}


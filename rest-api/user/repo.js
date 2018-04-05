const _ = require('lodash'),
  User = require('./model');

exports.getAll = function() {
  return User.find()
    .sort('name')
    .exec()
}

exports.getOne = function(id){
	return User.findById(id).exec();
}

exports.addOne = function(user) {
  return User.create(user);
}

exports.updateOne = function(id, body) {
  return User.replaceOne({_id: id}, body)
    .then(() => User.findById(id).exec())
}

exports.removeOne = function(id) {
  return User.remove({_id: id}).exec()
    .then(x => {
      return x;
    })
}


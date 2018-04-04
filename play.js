const _ = require('lodash');

/*
const patients = [
  [{name: 'John', roomNumber: 1, bedNumber: 1}],
  [{name: 'Lisa', roomNumber: 1, bedNumber: 2}],
  [{name: 'Chris', roomNumber: 2, bedNumber: 1}],
  [{name: 'Omar', roomNumber: 3, bedNumber: 1}]
];
*/

const arr = [
  {name: 'John', roomNumber: 3, bedNumber: 1},
  {name: 'Lisa', roomNumber: 1, bedNumber: 2},
  {name: 'Chris', roomNumber: 2, bedNumber: 1},
  {name: 'Omar', roomNumber: 3, bedNumber: 1}
];


console.log(arr);
console.log()
console.log(_.sortBy(_.sortBy(arr, 'roomNumber'), 'bedNumber'))


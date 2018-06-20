//this file is to tset matrix math syntax with javascript

//var math = require('mathjs');

const matrixA = math.matrix([[0, 1], [2, 3], [4, -5]]);
const matrixB = math.matrix([[1, -1], [-2, 4], [-7, 4]]);

// addition
var matrixAdditionAB = math.add(matrixA, matrixB);
//console.log(matrixAdditionAB);
// [ [ 1, 0 ], [ 0, 7 ], [ -3, -1 ] ]

// subtraction
var matrixAdditionAB = math.subtract(matrixA, matrixB);
// [ [ -1, 2 ], [ 4, -1 ], [ 11, -9 ] ]

// multiplication
const matrixK = math.matrix([[0, 1], [2, 3], [4, 5]]);
const matrixL = math.matrix([[2, 4], [6, 2]]);

const matrixKL = math.multiply(matrixK, matrixL);
// [ [ 6, 2 ], [ 22, 14 ], [ 38, 26 ] ]

// division
const matrixY = math.matrix([[0, 2], [2, 4], [4, 6]]);
const matrixZ = math.matrix([[2, 1], [2, 2]]);

const matrixYZ = math.divide(matrixY, matrixZ);
// [ [ -2, 2 ], [ -2, 3 ], [ -2, 4 ] ]

var input=[
  [3,5],
  [5,1],
  [10,2]
];
var weights=[
    [3,5,9],
    [1,8,6]
];
var z2 = math.multiply(input,weights);
//console.log(z2);

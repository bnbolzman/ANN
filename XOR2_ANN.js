//this includes test code
//This is the second attempt at making a Artificial Neural Network
//Date 03-30-18

//******************* Declaring All Functions Used ********************

function SIGMOID(array){
  //this is the sigmoid founction [ 1/(1+e^(-x)) ];
  var returnarray = [];
  var sigmoid_operation = function(x){
  return 1/(1+Math.exp(-x));
  }
  returnarray = array.map(sigmoid_operation)
  return returnarray;
}

function SIGMOID_PRIME(array){
  //this is sigmoid prime fuction [ e^x/(1+e^x)^2 ]
  var returnarray = [];
  var sigmoid_prime_operation = function(x){
  return Math.exp(-x)/Math.pow((1+Math.exp(-x)),2);
  }
  returnarray = array.map(sigmoid_prime_operation)
  return returnarray;
}

function ANN_LAYER_SETUP(inputNodes, hiddenNodes, outputNodes){
  //This function will set up the layers of the ANN
  //Set up the weights with values.
  var weights1ColumnSize = hiddenNodes;
  var weights1RowSize = inputNodes;
  var weights1Setup = [];
  var weights2ColumnSize = outputNodes;
  var weights2RowSize = hiddenNodes;
  var weights2Setup = [];
  var makeARandomNumber = function(){
    return Math.random().toFixed(6);
  }
  for (i=0;i<weights1RowSize;i++){
    var row = Array(weights1ColumnSize).fill(0).map(makeARandomNumber);
    weights1Setup.push(row);
  }
  var weights1 = math.matrix(weights1Setup);
  for (i=0;i<weights2RowSize;i++){
    var row = Array(weights2ColumnSize).fill(0).map(makeARandomNumber);
    weights2Setup.push(row);
  }
  var weights2 = math.matrix(weights2Setup);
  //returning variables
  return [weights1, weights2];
}

function FORWARD_PROPAGATION(x, w1, w2){
  //This function will perform all the calculations to get an output
  //For ease of math the fallowing terms have be condensed into shorter math terms
  // x -> is input
  // w1 and w2 -> are the weights on the fisrt and second columns of synapses
  // z2 and z3 -> are the values of the weights and nodes multipied together
  // a2 -> is the values that sit in the hidden nodes
  // y_hat -> is the unhelpful output
  var z2 = math.multiply(x,w1);
  console.log('z2');
  console.log(z2);
  var a2 = SIGMOID(z2);
  console.log('a2');
  console.log(a2);
  var z3 = math.multiply(a2,w2);
  console.log('z3');
  console.log(z3);
  var y_hat = SIGMOID(z3);
  console.log('y_hat');
  console.log(y_hat);
  //returning variables
  return [z2, a2, z3, y_hat];
}

function BACK_PROPAGATION(x, w1, w2, z2, a2, z3, y_hat, y){
  //This fuction will calculate the cost function and perform gradient descent.
  //It should be noted that for this particular ANN there is only one out put
  //so the cost function might be contrived in favor of this aspact.
  // e -> error size
  // j -> cost function
  // d3 -> backpropagating error for the third row of nodes
  // d2 -> backpropagating error for the secod row of nodes
  // f_prime_z3 -> z3 in sigmoid prime
  // f_prime_z2 -> z2 in the sigmoid prime
  var e = math.subtract(y,y_hat);
  console.log('e');
  console.log(e);
  var f_prime_z3 = SIGMOID_PRIME(z3);
  console.log('sigmoid prime');
  console.log(f_prime_z3);
  var d3 = math.multiply(e,f_prime_z3);
  console.log('d3');
  console.log(d3);
  var djdw2 = math.multiply(math.transpose(a2),d3);
  var f_prime_z2 = SIGMOID_PRIME(z2);
  var da = math.multiply(d3,math.transpose(w2));
  var d2 = math.cross(da,f_prime_z2);
  var djdw1 = math.multiply(math.transpose(x),d2);
  //return [e,f_prime_z3,d3,djdw2,f_prime_z2,djdw1];
  return [djdw2,djdw1];

}

function WEIGHT_CHANGE(w1,w2,djdw1,djdw2){
  //This function chnages the weights ofter every iteration
  new_weight1 = math.subtract(w1,djdw1);
  new_weight2 = math.subtract(w2,djdw2);
  return [new_weight1, new_weight2];
}

//**************************** Training the ANN *************************
//Fedding The ANN With Inputs
var input_nodes_size = 2;
var hidden_nodes_size = 3;
var output_nodes_size = 1;
var num_of_iterations = 4;
//This for loop makes an array full of input arrays
var input_vec = [];
var makeBinaryNumber = function(){
  return Math.floor(Math.random() * 2);
}
for (i=0;i<num_of_iterations;i++){
  var row = Array(input_nodes_size).fill(0).map(makeBinaryNumber);
  input_vec.push(row);
}


console.log('--------------------------');
console.log(math.matrix(input_vec));
console.log('--------------------------');

//The below line of code initiates the ANN with randome values in weights1 and weights2
var [weights1, weights2]=ANN_LAYER_SETUP(input_nodes_size,hidden_nodes_size,output_nodes_size);
//The below for loop is what performs foward and back propagation on every iteration.
for ( i = 0; i < num_of_iterations; i++){
  console.log('this is '+i+' iteration');
  var input = math.matrix(input_vec);
  //target is the wanted output
  var target = 0;
  if (input.subset(math.index(0,0)) != input.subset(math.index(0,1))){
    target = 1;
  }
  var [z2, a2, z3, y_hat]=FORWARD_PROPAGATION(input, weights1, weights2);
  var [djdw2,djdw1]=BACK_PROPAGATION(input, weights1, weights2, z2, a2, z3, y_hat,target);
  //NEED TO TEST THIS FUNCTION!!!!!!!!!!!!!!!
  var [weights1, weights2]=WEIGHT_CHANGE(weights1,weights2,djdw1,djdw2);
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
  console.log('input');
  console.log(input);
  console.log('expected');
  console.log(target);
  console.log('output');
  console.log(y_hat);
  console.log('--------------------');
}

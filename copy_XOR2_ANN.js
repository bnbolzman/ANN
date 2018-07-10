//this file is just a copy of the code that was working before


//below this line is the working code for the ANN
//#########################################################################
//This is the second attempt at making a Artificial Neural Network
//Date 03-30-18

//******************* Declaring All Functions Used ********************

function SIGMOID(array){
  //this is the sigmoid founction [ 1/(1+e^(-x)) ];
  var returnarray = [];
  array.forEach(function(x){
  returnarray.push(1/(1+Math.exp(-x)));
  });
  return math.matrix([returnarray]);
}

function SIGMOID_PRIME(array){
  //this is sigmoid prime fuction [ e^x/(1+e^x)^2 ]
  var returnarray = [];
  array.forEach(function(x){
  returnarray.push(Math.exp(-x)/Math.pow((1+Math.exp(-x)),2));
  });
  return math.matrix([returnarray]);
}

function ANN_LAYER_SETUP(inputvector, inputNodes, hiddenNodes, outputNodes){
  //This function will set up the layers of the ANN
  //Set up the input vector with values.
  var input = math.matrix(inputvector);
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
  return [input, weights1, weights2];
}

function FORWARD_PROPAGATION(x, w1, w2){
  //This function will perform all the calculations to get an output
  //For ease of math the fallowing terms have be condensed into shorter math terms
  // x -> is input
  // w1 and w2 -> are the weights on the fisrt and second columns of synapses
  // z2 and z3 -> are the values of the weights and nodes multipied together
  // a2 -> is the values that sit in the hidden nodes
  // y_hat -> is the ANN's best guess
  var z2 = math.multiply(x,w1);

  let a = math.matrix([[1,2],[3,4],[3,4]]);
  console.log('a');
  console.log(a);

  var a2 = SIGMOID(z2);
  var z3 = math.multiply(a2,w2);
  var y_hat = SIGMOID(z3);
  //returning variables
  return [z2, a2, z3, y_hat];
}

function BACK_PROPAGATION(x, w1, w2, z2, a2, z3, y_hat, y){
  //This fuction will calculate the cost function and perform gradient descent.
  //It should be noted that for this particular ANN there is only one out put
  //so the cost function might be contrived in favor of this aspact.
  // y is the correct answer the number the ANN is trying to achive
  // e -> error size
  // j -> cost function
  // d3 -> backpropagating error for the third row of nodes
  // d2 -> backpropagating error for the second row of nodes
  // f_prime_z3 -> z3 in sigmoid prime
  // f_prime_z2 -> z2 in the sigmoid prime
  var e = math.subtract(y_hat,y);
  var f_prime_z3 = SIGMOID_PRIME(z3);
  var d3 = math.multiply(e,f_prime_z3);
  var djdw2 = math.multiply(math.transpose(a2),d3);
  var f_prime_z2 = SIGMOID_PRIME(z2);
  var da = math.multiply(d3,math.transpose(w2));
  console.log('w2');
  console.log(w2);
  console.log('djdw2');
  console.log(djdw2);
  console.log('da below');
  console.log(da);
  console.log('f_prime_z2 below');
  console.log(f_prime_z2);
  //math.dotMultiply([1,2,3,4],[5,6,7,8]);
  var d2 = math.dotMultiply(da,f_prime_z2);
  var djdw1 = math.multiply(math.transpose(x),d2);
  //return [e,f_prime_z3,d3,djdw2,f_prime_z2,djdw1];
  return [e,djdw2,djdw1];

}

function WEIGHT_CHANGE(w1,w2,djdw1,djdw2){
  //This function chnages the weights after every iteration
  new_weight1 = math.subtract(w1,djdw1);
  new_weight2 = math.subtract(w2,djdw2);
  return [new_weight1, new_weight2];
}


//**************************** Training the ANN *************************
//Fedding The ANN With Inputs
var input_nodes_size = 2;
var hidden_nodes_size = 3;
var output_nodes_size = 1;
var num_of_iterations = 100;
//This for loop makes an array full of input arrays
var input_vec = [];
for ( i = 0; i < num_of_iterations; i++){
  var a = Math.floor(Math.random() * 2);
  var b = Math.floor(Math.random() * 2);
  var vec = [a,b];
  input_vec[i] = math.matrix([vec]);
}
console.log('********************************');
console.log(input_vec[0]);
console.log('********************************');
//The below line of code initiates the ANN with randome values in weights1 and weights2
var [input, weights1, weights2]=ANN_LAYER_SETUP(input_vec[0],input_nodes_size,hidden_nodes_size,output_nodes_size);
//declaring variables that will are used in the for loop.
var target = [];
var results = [];
var delta_e = [];
var counter = 0 ;
var onecounter = 0;
var zerocounter = 0;
//The below for loop is what performs foward and back propagation on every iteration.
for ( i = 0; i < num_of_iterations; i++){
  console.log('this is '+i+' iteration');
  input = input_vec[i];

  //target is the wanted output
  if (input.subset(math.index(0,0)) != input.subset(math.index(0,1))){
    target[i] = 1;
  }else {
    target[i] = 0;
  }
  //vvvvvvvvvvvthe bellow is for testing a constant input
  //input = math.matrix([[0,1]]);
  //target[i]=1;
  //^^^^^^^^^^^^^^^^^^^
  var [z2, a2, z3, y_hat]=FORWARD_PROPAGATION(input, weights1, weights2);
  var [e,djdw2,djdw1]=BACK_PROPAGATION(input, weights1, weights2, z2, a2, z3, y_hat,target[i]);
  delta_e[i] = e._data[0];
  //NEED TO TEST THIS FUNCTION!!!!!!!!!!!!!!!
  var [weights1, weights2]=WEIGHT_CHANGE(weights1,weights2,djdw1,djdw2);
  results[i] = y_hat._data[0];
  console.log('input');
  console.log(input._data[0]);
  console.log('expected');
  console.log(target[i]);
  console.log('output');
  console.log(y_hat._data[0]);
  console.log('--------------------');
  if (y_hat._data[0] > 0.99 && target[i] == 1){
    onecounter +=1;
    counter +=1;
  } else if (y_hat._data[0] < 0.01 && target[i] == 0){
    zerocounter +=1;
    counter +=1;
  }
}
console.log("num of corrent gusses");
console.log(counter+': '+(counter/num_of_iterations*100)+'%');
console.log(onecounter+': '+(onecounter/counter*100)+'%');
console.log(zerocounter+': '+(zerocounter/counter*100)+'%');
//these next few lines sends data to html to plot in chart.js
localStorage.setItem("num_of_iterations", num_of_iterations);
localStorage.setItem("target", JSON.stringify(target));
localStorage.setItem("results", JSON.stringify(results));
localStorage.setItem("delta_e", JSON.stringify(delta_e));


//**************************** Random Testing ************************
/*
var x=math.matrix([[3,5]]);
var [a,b,c] = ANN_LAYER_SETUP(x,2,3,1);
a = x;
b = math.matrix([
  [0.474104,0.288615,0.835591],
  [0.051202,0.627314,0.889734]
])
c = math.matrix([
  [0.971220],
  [0.186808],
  [0.442798]
])
var [d,e,f,g] = FORWARD_PROPAGATION(a,b,c);
var [e,f_prime_z3,d3,djdw2,f_prime_z2,djdw1] = BACK_PROPAGATION(a,b,c,d,e,f,g,75);
*/

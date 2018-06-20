//This code is a test to understand how a Artifical Neural Network(ANN) work.
// In particular this code will create train the ANN.

//The set up of this ANN will have two input nodes, three hidden nodes, and one output node.

//List of all the functions
  function Sigmoid(x){
    //this is the sigmoid founction [ 1/(1+e^(-x)) ];
    var y = 1/(1+Math.exp(-x));
    return y;
  }
  function Sigmoid_Prime(x){
    var y = Math.exp(x)/Math.pow((1+Math.exp(x)),2);
    return y;
  }

//Initialize weights
  var weights =new Array(9)
  weights = [0.8,0.4,0.3,0.2,0.9,0.5,0.3,0.5,0.9];
  //Gives the weights a randome number form 0-1 if the weights are null.
  if (weights[8] == null){
    for (var i=0; i<weights.length; i++){
      weights[i]= Math.random();
    }
  }

//Initialize input_nodes
  var input_nodes=new Array(2);
  //give a value of 0 or 1 to the input_nodes
  for (var i=0 ; i<input_nodes.length; i++ ){
    input_nodes[i] = Math.floor(Math.random() * 2);
  }
  input_nodes=[1,1]
console.log(input_nodes);
console.log(weights);

//Forward Propagation
  var hidden_nodes=new Array(3);
  var output_nodes=new Array(1);
  var influence_hidden=new Array(3);//influence is just the summ of the inputs*weights.
  var influence_output=new Array(1);
  //this loop finds the influence for all of the hidden nodes.
  for (var i=0; i<influence_hidden.length; i++){
   influence_hidden[i]=input_nodes[0]*weights[i]+input_nodes[1]*weights[i+3];
  }
  //this loop find the value of the hidden nodes by putting the influence in the sigmoid function.
  for (var i=0; i<hidden_nodes.length; i++){
   hidden_nodes[i] = Sigmoid(influence_hidden[i]);
  }
  //this loop finds all the influence for the output nodes.
  for (var i=0; i<influence_output.length; i++){
   influence_output[i]=hidden_nodes[0]*weights[6]+hidden_nodes[1]*weights[7]+hidden_nodes[2]*weights[8];
  }
 //this loop find the value of the output nodes by putting the influence in the sigmoid function.
 for (var i=0; i<output_nodes.length; i++){
  output_nodes[i] = Sigmoid(influence_hidden[i]);
 }

 console.log(influence_hidden);
 console.log(hidden_nodes);
console.log(influence_output);
console.log(output_nodes);

//Back Propagation
  //Initializeing the new weights.
  var new_weights=new Array(9);
  //target is the value that sould have been outputed.
  var target = 0;
  if (input_nodes[0] != input_nodes[1]){
    target = 1;
  }
  //finding the amount of error in the output.
  var margin_error = target - output_nodes[0]
  //finding the better weight values for the output nodes (weights 6-8).
  var delta_output_sum = Sigmoid_Prime(influence_output[0])*margin_error;
  for (var i = 6; i < (hidden_nodes.length*output_nodes.length+6); i++) {
    new_weights[i] = weights[i] + delta_output_sum/hidden_nodes[i-6];
  }
  //finding more precise values for the hidden_nodes (weights 0-5).
  var delta_hidden_sum =new Array(hidden_nodes.length);
  for (var i=0; i<delta_hidden_sum.length; i++){
    delta_hidden_sum[i] = Sigmoid_Prime(influence_hidden[0])*delta_output_sum/weights[i+6];
  }
  for (var i = 0; i < (hidden_nodes.length*input_nodes.length); i++){
    var input = (i > 2) ? input_nodes[0] : input_nodes[1]; //this line is just an if else logic condensed.
    // this is to make sure that the delta_hidden_sum repeats to fill all 6 elements in new_weights.
    var hidden_sum_repeat= (i > 2) ? 3 : 0;
    new_weights[i] = weights[i] + delta_hidden_sum[i-hidden_sum_repeat]/input;
  }


//Update Wights
  for (var i=0; i<weights.length; i++){
    weights[i]=new_weights[i];
  }


//Training the ANN
  //loging for debuging purposes.
  console.log(weights);

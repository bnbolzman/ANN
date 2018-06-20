function Training(current_weights){
  function nan2infinity(number){
    if (isNaN(number)){
      return Infinity;
    }else{
      return number;
    }
  }

  //Initialize input_nodes
    var input_nodes=new Array(2);
    //give a value of 0 or 1 to the input_nodes
    for (var i=0 ; i<input_nodes.length; i++ ){
      input_nodes[i] = Math.floor(Math.random() * 2);
    }
    console.log("the input is "+input_nodes);

  //Forward Propagation
    var hidden_nodes=new Array(3);
    var output_nodes=new Array(1);
    var influence_hidden=new Array(3);//influence is just the summ of the inputs*current_weights.
    var influence_output=new Array(1);
    //this loop finds the influence for all of the hidden nodes.
    for (var i=0; i<influence_hidden.length; i++){
     influence_hidden[i]=nan2infinity(input_nodes[0]*current_weights[i]+input_nodes[1]*current_weights[i+3]);

    }
    //this loop find the value of the hidden nodes by putting the influence in the sigmoid function.
    for (var i=0; i<hidden_nodes.length; i++){
     hidden_nodes[i] = Sigmoid(influence_hidden[i]);
    }
    //this loop finds all the influence for the output nodes.
    for (var i=0; i<influence_output.length; i++){
     influence_output[i]=nan2infinity(hidden_nodes[0]*current_weights[6]+hidden_nodes[1]*current_weights[7]+hidden_nodes[2]*current_weights[8]);
    }
   //this loop find the value of the output nodes by putting the influence in the sigmoid function.
   for (var i=0; i<output_nodes.length; i++){
    output_nodes[i] = Sigmoid(influence_hidden[i]);
   }
   console.log("The output is "+output_nodes);
   console.log(hidden_nodes);
   console.log(output_nodes);
   console.log(influence_hidden);
   console.log(influence_output);

  //Back Propagation ************************>
    //initializeing the new_weights.
    var new_weights=new Array(9);
    //target is the value that sould have been outputed.
    var target = 0;
    if (input_nodes[0] != input_nodes[1]){
      target = 1;
    }
    //finding the amount of error in the output.
    var margin_error = target - output_nodes[0]
    //finding the better weight values for the output nodes (current_weights 6-8).
    var delta_output_sum = Sigmoid_Prime(influence_output[0])*margin_error;
    for (var i = 6; i < (hidden_nodes.length*output_nodes.length+6); i++) {
      new_weights[i] = current_weights[i] + delta_output_sum/hidden_nodes[i-6];
    }
    console.log("delta_output_sum "+delta_output_sum);
    console.log("current weights "+current_weights);
    //finding more precise values for the hidden_nodes (current_weights 0-5).
    var delta_hidden_sum =new Array(hidden_nodes.length);
    for (var i=0; i<delta_hidden_sum.length; i++){
      delta_hidden_sum[i] = Sigmoid_Prime(influence_hidden[0])*delta_output_sum/current_weights[i+6];
    }
    console.log(delta_hidden_sum);
    for (var i = 0; i < (hidden_nodes.length*input_nodes.length); i++){
      var input = (i > 2) ? input_nodes[0] : input_nodes[1]; //this line is just an if else logic condensed.
      // this is to make sure that the delta_hidden_sum repeats to fill all 6 elements in new_weights.
      var hidden_sum_repeat= (i > 2) ? 3 : 0;
      new_weights[i] = current_weights[i] + delta_hidden_sum[i-hidden_sum_repeat]/input;
    }
    console.log(new_weights);
  //Return
    return new_weights;
}

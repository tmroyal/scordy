class Adder extends AudioWorkletProcessor {
  static get parameterDescriptors () {
    return [
      {
        name: 'value',
        defaultValue: 0,
        automationRate: 'a-rate' 
      }
    ]
  }

  process (inputs, outputs, parameters) {
    const output = outputs[0];
    const input = inputs[0][0]; 

    output.forEach(channel => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = input[i] + 
          (parameters['value'].length > 1 ? parameters['value'][i] : parameters['value'][0])
      }
    })
    return true
  }

}

registerProcessor('adder', Adder);
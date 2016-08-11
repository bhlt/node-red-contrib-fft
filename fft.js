module.exports = function(RED) {

    function transformFFT(config) {
    	var lib = require("ml-fft");
    	RED.nodes.createNode(this,config);
        var node = this;
        //this.status({fill:"red",shape:"dot",text:"not started"});
        //node.log("config=" + JSON.stringify(config))
        
        this.on("input", function(msg){
            msgo=msg
        	var keys=["accelerometer_x","accelerometer_y"]
        	toTransform={}
        	
        	input=eval("msg." +config.input)


        	for (row=0; row< input.length ; row++) {

        		for (col=0; col< keys.length ; col++) {
        			
        			key=keys[col]
        			value=input[row][key];

        			if (typeof toTransform[key]== "undefined"){
        				toTransform[key]=[value];
        			}
            		toTransform[key].push(value)
            	}
        	}

            msg.payload.data="deleted"
        	for (i=0 ; i < Object.keys(toTransform).length ; i++) {
                key=Object.keys(toTransform)[i]
        		ftt_out=fft_transform(toTransform[key])

        		key_out=config.out_prefix + key
        		//flaten array to features
                for (o=0 ; o<key_out.length ; o++) {
                    msg.payload[key_out + "_" + o] = ftt_out[o]

                }
        	}

        	node.send(msg)
        	
        	
        }
        )
     
        function fft_transform(input){
        	output=[]
        	FFT=require("fft")
        	var fft = new FFT.complex(input.length)

            /* Output and input should be float arrays (of the right length), type is either 'complex' (default) or 'real' */
            //fft.process(output, outputOffset, outputStride, input, inputOffset, inputStride, type)

            /* Or the simplified interface, which just sets the offsets to 0, and the strides to 1 */
            out=fft.simple(output, input, config.transformType)
            //node.log("fft_in=" + input + "\n fft_out=" + JSON.stringify(output))
            return output

        	
        }
 
    }
    RED.nodes.registerType("fft",transformFFT);
}
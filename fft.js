module.exports = function(RED) {

    function transformFFT(config) {
    	var lib = require("ml-fft");
    	RED.nodes.createNode(this,config);
        var node = this;
        //this.status({fill:"red",shape:"dot",text:"not started"});
        node.log("config=" + JSON.stringify(config))
        
        this.on("input", function(msg){
        	var keys=["accelerometer_x","accelerometer_y"]
        	toTransform={}
        	
        	input=msg[config.input]
        	//node.log("msg=" + input.length);
        	// for each row
        	for (row=0; row< input.length ; row++) {
        		// for each column needed
        		for (col=0; col< keys.length ; col++) {
        			
        			key=keys[col]
        			value=input[row][key];
        			//node.log(JSON.stringify(Object.keys(keys)));
        			
        			if (typeof toTransform[key]== "undefined"){
        				toTransform[key]=[value];
        			}
            		toTransform[key].push(value)
            	}
        	}
        	//node.log("toTransform=" + JSON.stringify(toTransform))
        	
        	for (i=0 ; i < Object.keys(toTransform).length ; i++) {
        		transform(Object.keys(toTransform)[i])
        	}
        	
        	
        	
        }
        )
     
        function transform(source){
        	output=[]
        	
        	var FFT = lib.FFT;
        	var FFTUtils = lib.FFTUtils
        	//fft.simple(output, source, "real")
        	FFT.fft(output,source);
        	node.log("fft_out=" + JSON.stringify(output))
        	
        }
 
    }
    RED.nodes.registerType("fft",transformFFT);
}
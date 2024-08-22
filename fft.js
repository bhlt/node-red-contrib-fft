module.exports = function(RED) {

    function transformFFT(config) {
    	RED.nodes.createNode(this,config);
        var node = this;
        //this.status({fill:"red",shape:"dot",text:"not started"});
        //node.log("config=" + JSON.stringify(config))

        //fft_out=ft_transform(input,true)
        singleValue=true
        preserve=false
        node.log("singleValue" + JSON.stringify(config,null,2))
        if(config.hasOwnProperty('singleValue')) {
            singleValue=config.singleValue
        }

        this.on("input", function(msg){
            msgo=msg
        	var keys=config.fields.split(",")
        	toTransform={}

        	input=eval("msg." +config.input)

            if (singleValue==true){
                fft_out=fft_transform(input,true,"fft_")
                fft_keys=Object.keys(fft_out)
                for (p=0 ; p<fft_keys.length ; p++){
                    fft_key=fft_keys[p]
                    msg.payload[fft_key]=fft_out[fft_key]
                }

            }

            else{
                for (row=0; row< input.length ; row++) {

                    for (col=0; col< keys.length ; col++) {

                        key=keys[col]
                        value=input[row][key];

                        if (typeof toTransform[key]== "undefined"){
                            toTransform[key]=[];
                        }
                        toTransform[key].push(value)
                    }
                }

                delete msg.payload.data
                for (i=0 ; i < Object.keys(toTransform).length ; i++) {
                    key=Object.keys(toTransform)[i]
                    ftt_out=fft_transform(toTransform[key])

                    key_out=config.out_prefix + key
                    //flaten array to features


                    //transformation to get the same number of values in the output than in the input
                    for (o=0 ; o<(ftt_out.length/2) ; o++) {
                        ind=o*2
                        msg.payload[key_out + "_" + o] = Math.sqrt(Math.pow(ftt_out[ind],2) + Math.pow(ftt_out[ind+1],2))

                    }
                }
               }
            if (preserve==false){
                //delete eval("msg." + "payload")["data"]
                //node.log("preserve input" + input  + "preserve_config" + config.input)
                //delete msg[config.input]
            }
        	node.send(msg)


        }//function
        )//this.on

        function fft_reduce(red_input,prefix){ //,prefix=""
            var red_out={}
            for (o=0 ; o<(red_input.length/2) ; o++) {
                var key=prefix + o
                ind=o*2
                red_out[key] = Math.sqrt(Math.pow(red_input[ind],2) + Math.pow(red_input[ind+1],2))
            }
            return red_out
        }

        function fft_transform(input,reduce,prefix){ //,reduce=false,prefix="fft_"
        	output=[]
        	FFT=require("fft")
        	var fft = new FFT.complex(input.length)

            // Output and input should be float arrays (of the right length), type is either 'complex' (default) or 'real' 
            //fft.process(output, outputOffset, outputStride, input, inputOffset, inputStride, type)

            // Or the simplified interface, which just sets the offsets to 0, and the strides to 1 
        
            //out=fft.simple(output, input, config.transformType)

            out=fft.process(output,0,1,input,0,1, config.transformType)
            //node.log(JSON.stringify())
            if (reduce==true){
                output=fft_reduce(output,prefix)
            }
            return output
        }



    }//function node-red
    RED.nodes.registerType("fft",transformFFT);
}//RED
# node-red-contrib-fft

Node to convert one or more values within an array, using fourier transformation fft.

## example : 
### input
```json
{
    "payload":{
      "data" :  
        [  
          {"accelerometer_x" : 1 , "accelerometer_y":2}, 
          {"accelerometer_x" : 1 , "accelerometer_y":2}, 
          {"accelerometer_x" : 1 , "accelerometer_y":2}, 
          {"accelerometer_x" : 1 , "accelerometer_y":2}, 
          {"accelerometer_x" : 1 , "accelerometer_y":2}, 
          {"accelerometer_x" : 1 , "accelerometer_y":2} 
        ]
}

```
### config

input : msg.payload.data

prefix : fft_

type : real

### result
```json
{ 
  "topic": "", 
  "payload": { 
    "fft_accelerometer_x_0": 7, 
    "fft_accelerometer_x_1": 0, 
    "fft_accelerometer_x_2": -1.1102230246251565e-16,
    "fft_accelerometer_x_3": 1.1102230246251565e-16, 
    "fft_accelerometer_x_4": -2.498001805406602e-16, 
    "fft_accelerometer_x_5": -1.1102230246251565e-16
    //...
  }
}
```

## to do
- add other output templates
- support complex transformation

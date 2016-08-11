# node-red-contrib-fft

Node to convert one or more values within an array, using fourier transformation fft.

## example : 
### input
```json
{ "data" :  [  
{"accelerometer_x" : 9 , "accelerometer_y":2}, 
{"accelerometer_x" : 7 , "accelerometer_y":2}, 
{"accelerometer_x" : 5 , "accelerometer_y":0}, 
{"accelerometer_x" : 7 , "accelerometer_y":2}
]}

```
### config

input : msg.payload.data

prefix : fft_

type : real

### result
```json
{ 
  payload: 
   { fft_accelerometer_x_0: 28,
     fft_accelerometer_x_1: 4,
     fft_accelerometer_x_2: 0,
     fft_accelerometer_x_3: 4,
     fft_accelerometer_y_0: 6,
     fft_accelerometer_y_1: 2,
     fft_accelerometer_y_2: 2,
     fft_accelerometer_y_3: 2
    } 
}
```

## to do
- add other output templates
- support complex transformation

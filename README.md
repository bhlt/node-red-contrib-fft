# node-red-contrib-fft

Node to convert one or more values within an array, using fourier transformation fft.

## example : 
### input
```json
{ "data" :  [  
{"accelerometer_x" : 9 , "accelerometer_y":2, "accelerometer_z":2},
{"accelerometer_x" : 7 , "accelerometer_y":2, "accelerometer_z":2},
{"accelerometer_x" : 5 , "accelerometer_y":0, "accelerometer_z":0},
{"accelerometer_x" : 7 , "accelerometer_y":2, "accelerometer_z":2}
]}

```
### config

input : msg.payload.data
fields : accelerometer_x,accelerometer_y,accelerometer_z
prefix : fft_
type : real

### result
```json
{
  "payload" :
   { "fft_accelerometer_x_0": 28,
     "fft_accelerometer_x_1": 4,
     "fft_accelerometer_x_2": 0,
     "fft_accelerometer_x_3": 4,
     "fft_accelerometer_y_0": 6,
     "fft_accelerometer_y_1": 2,
     "fft_accelerometer_y_2": 2,
     "fft_accelerometer_y_3": 2
     "fft_accelerometer_z_0": 6,
     "fft_accelerometer_z_1": 2,
     "fft_accelerometer_z_2": 2,
     "fft_accelerometer_z_3": 2
    }
}
```

## to do
- add option multiple input for fields in place of comma seperated list
- handle fields from the array not used for transformation
- add other output templates
- support complex transformation

[link](http://leanbi.ch/big-data/ "leanbi")

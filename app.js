const geocode = require('./utilis/geocode') 
const forecast = require('./utilis/forecast')


const address = process.argv[2]     //application will grab whatever address is stored on the variable.

if(!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {   //only use geocode if an address is provided.
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return console.log(error)
            }
            
            console.log(data.location)
            console.log(forecastData)
        })
    })
}


geocode('Texas', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
    forecast(-75.7088, 44.1545, (error, data) => {
        console.log('Error', error)
        console.log('Data', data)
    })

})

// //m for celsius, s for Kelvin, f for farhenheit

//Geocoding which means taking an address and 
 //converting it into a Latitude and Longitude corrdinant pair

//Address -> lat/long -> Weather

//two aschicronus operations
//both are independlty operating on their own.




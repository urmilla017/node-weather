const request = require('request');

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1f0869842c4eb6abbe508f7362050ce7&query=' + lat + ',' + lon + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('unable to connect to weather services', undefined);
        } else if(body.error) {
            callback('unable to find location', undefined);
        } else {
            callback(undefined, 
                'Weather is ' + body.current.weather_descriptions[0] 
                + '. It is currently ' + body.current.temperature 
                + ' degress out. It feels like ' 
                + body.current.feelslike + ' degrees.'
                + ' Cloud cover is ' + body.current.cloudcover + ' %.'
                + 'Wind direction is ' + body.current.wind_dir + '.'
            );
            // callback(undefined, {
            //     temp: body.current.temperature,
            //     feelslike: body.current.feelslike,
            //     desc: body.current.weather_descriptions[0]
            // })
        }
    })
}

module.exports = forecast;
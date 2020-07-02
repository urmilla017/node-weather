const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidXJtaWxsYTIzIiwiYSI6ImNrYzBjZmhoYTFpYjQzNG14cDV5cndyeXYifQ.wxS2pnAt6umf5wENi57B7A&limit=1';

    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('unable to connect to location services', undefined)
        } else if(body.features.length === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].text
            })
        }
    })
}

module.exports = geocode;
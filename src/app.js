// core module
const path = require('path');

// npm module
const express = require('express');
const hbs = require('hbs');

// local files
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

// process.env.PORT for heroku or 3000 as fallback default
const port = process.env.PORT || 3000;

// app.com
// app.com/about
// app.com/help

// route for static root
// customize server to load particular folder as a default page
// define paths
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// if folder holding .hbs files has a different name 'templates'
// const viewsPath = path.join(__dirname, '../templates');
// app.set('views', viewsPath);

// partials
// const partialsPath = path.join(__dirname, '../templates/partials');
// hbs.registerPartials(partialsPath);

// setup handlebars engine, views location and partials
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath))

// render handlebar file -> index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abc def'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abc Def'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help?',
        name: 'Abc def',
        helpText: 'what can i help you with?'
    });
});


// route for root
// app.get('', (req, res) => {
    // res.send('hello express!');
    // res.send('<h1>WEATHER</h1>')
// });

// route for help
// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'abc',
//             age: 12
//         },
//         {
//             name: 'def',
//             age: 11
//         }
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>about page</h1>');
// });

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        // no address available
        return res.send({
            error: 'you must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error: error
            });
        }
        // console.log('Error', error);
        // console.log('data', JSON.stringify(data));
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                forecast: forecastData,
                // temperature: 50,
                // location: 'Boston',
                location: location,
                address: req.query.address
            });
            // console.log('Error', error)
            // console.log('forecastData', JSON.stringify(forecastData))
            // console.log(location);
            // console.log(JSON.stringify(forecastData));

            
        });
    });

    
});

app.get('/products', (req, res) => {
    // console.log(req.query);
    // console.log(req.query.search);

    if(!req.query.search) {
        //no search term available
        return res.send({
            error: 'you must provide a search term'
        });
    }
    
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'abc def',
        errorMessage: 'Help article not found'
    });
});

// for 404 error
// shuold always come last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'abc def',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('server is up on port ' + port);
});
console.log('client side js file');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'JS';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit');

    const location = search.value;
    console.log(location);

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error);

                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                console.log(data.location);
                console.log(data.forecast);         

                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
    
});
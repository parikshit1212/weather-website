console.log("Client side javascript file is loaded!");

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// 

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;
    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';


    const url = 'http://localhost:3000/weather?address=' + location; 
    console.log(url);
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        })
    })
    console.log(location);
})

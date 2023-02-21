console.log('Client side javascript file is loaded!')

//calling fetch in client side JS is gonna kick off aschronus IO operation

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //going to prevent that default behaviour which is to refresh the browser allowing the server to render any page. Instead its going to allow us to do whatever we want by letting the function run!  

    const location = search.value //only fetch when the form is submitted!

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
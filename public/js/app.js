// const { response } = require("express")

console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })

}) //calling fetch in client side JS is gonna kick off aschronus IO operation

fetch('http://localhost:3000/weather?address=charlotte').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
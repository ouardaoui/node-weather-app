// const axios = require("axios")
const inputFun = (address, callback) => {
  const url = "http://localhost:3000/weather?address=" + encodeURIComponent(address)
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      callback(data)
    })
}
const handleResult = (data) => {
  if (data.errorMessage) {
    messageOne.textContent = data.errorMessage
  } else {
    messageOne.textContent = data.location
    messageTwo.textContent = `${data.description}.it is currently ${data.temperature} .${data.precipitation} chance of rain`

  }
}



const weatherForm = document.querySelector("form")
const weatherInput = document.querySelector("input")
const messageOne = document.getElementById("msg-1")
const messageTwo = document.getElementById("msg-2")



weatherForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const location = weatherInput.value
  messageOne.textContent = "leading......"
  messageTwo.textContent = ""
  inputFun(location, (data) => handleResult(data))


})

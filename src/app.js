const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require("../utils/forecast")
const geolocation = require("../utils/geolocation")

const app = express()
const port = process.env.PORT || 3000

// define a path for express templates
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static view server
app.use(express.static(publicDirPath))


app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Ragnar"
  })
})
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "ragnar"
  })
})
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "ragnar"
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      errorMessage: "You must provide a address"
    })
  }
  geolocation(req.query.address, ({ longitude, latitude, location } = {}, error) => {
    if (!error) {
      forecast(latitude, longitude, ({ temperature, description, precipitation }, errorForecast) => {
        if (!error) {
          res.send({ location, temperature, description, precipitation })
        } else {
          res.send({ errorMessage: errorForecast })
        }
      }
      )
    } else {
      res.send({ errorMessage: error })
    }
  })

})
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found"
  })
})

app.listen(port, () => {
  console.log("Serve in up to port" + port)
})
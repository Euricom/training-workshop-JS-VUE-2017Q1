var express = require('express')
var morgan = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')
var _ = require('underscore')
var faker = require('faker')

// app setup
var app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// setup users
var users = [
  { id: 1, name: 'peter', role: 'admin' },
  { id: 2, name: 'jan', role: 'user' },
]
users = generateUsers(50)
console.log(users)

// routes
app.get('/api/users', (req, res, next) => {
  // return all resource
  res.send(users)
})

app.get('/api/users/:id', (req, res, next) => {
  // find user
  var user = _.findWhere(users, { id: +req.params.id })
  if (!user) {
    return res.send(404, 'not found')
  }

  // return resource
  return res.send(user)
})

app.post('/api/users', (req, res, next) => {
  // Get resource
  var resource = req.body

  // Assign number
  resource.id = new Date().valueOf()

  // Add to users's
  users.push(resource)

  // return resource
  res.status(200).send(resource)
})

app.put('/api/users/:id', (req, res, next) => {
  // Get resource
  var resource = req.body

  // Find and update
  var user = _.findWhere(users, { id: Number(req.params.id) })
  if (!user) {
    return res.send(404, 'not found')
  }

  user.task = resource.name
  user.state = resource.role
  return res.status(200).send(user)
})

app.delete('/api/users/:id', (req, res, next) => {
  var user = _.findWhere(users, { id: Number(req.params.id) })
  if (!user) {
    return res.status(204)
  }

  users = _.without(users, user)
  return res.status(200).send(user)
})

// listen for requests
var port = process.env.PORT || 3000
var server = app.listen(port, function () {
  console.log(`Express server listening on port: ${server.address().port}`)
})

function generateUsers (count) {
  const users = []
  for (var i = 0; i < count; i++) {
    var firstName, imageUrl
    var random = faker.Helpers.randomNumber(2)
    if (random === 1) {
      firstName = faker.Name.firstNameFemale()
      imageUrl = `http://api.randomuser.me/portraits/women/${faker.Helpers.randomNumber(100)}.jpg`
    } else {
      firstName = faker.Name.firstNameMale()
      imageUrl = `http://api.randomuser.me/portraits/men/${faker.Helpers.randomNumber(100)}.jpg`
    }
    var lastName = faker.Name.lastName()
    users.push({
      firstName: firstName,
      lastName: lastName,
      age: faker.Helpers.randomNumber(100),
      email: `${firstName}.${lastName}@${faker.Internet.domainName()}`.toLowerCase(),
      image: imageUrl,
      phone: faker.PhoneNumber.phoneNumber(),
      company: faker.Image.imageUrl(),
      address: {
        street: faker.Address.streetName(),
        city: faker.Address.city(),
        zip: faker.Address.zipCode(),
      },
    })
  }
  return users
}

const faker = require('Faker')

module.exports = {
  generateUsers(count) {
    const users = []
    for (let i = 0; i < count; i++) {  // eslint-disable-line
      let firstName
      let imageUrl
      const random = faker.Helpers.randomNumber(2)
      if (random === 1) {
        firstName = faker.Name.firstNameFemale()
        imageUrl = `http://api.randomuser.me/portraits/women/${faker.Helpers.randomNumber(100)}.jpg`
      } else {
        firstName = faker.Name.firstNameMale()
        imageUrl = `http://api.randomuser.me/portraits/men/${faker.Helpers.randomNumber(100)}.jpg`
      }
      const lastName = faker.Name.lastName()
      users.push({
        id: 1000 + i,
        firstName,
        lastName,
        age: faker.Helpers.randomNumber(100),
        email: `${firstName}.${lastName}@${faker.Internet.domainName()}`.toLowerCase(),
        image: imageUrl,
        phone: faker.PhoneNumber.phoneNumber(),
        company: faker.Company.companyName(),
        address: {
          street: faker.Address.streetName(),
          city: faker.Address.city(),
          zip: faker.Address.zipCode(),
        },
      })
    }
    return users
  },
}

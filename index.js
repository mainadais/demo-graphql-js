const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const rootValue = require('./src/resolvers')

const schema = require('./src/schema')
const port = 3000

const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
}))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

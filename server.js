const express = require('express')
const routers = require('./src/routers')
const app = express()

// use Body Parser
app.use(express.json())

app.use('/api/v1', routers)

app.listen(process.env.port || 5000, () => {
  console.log('Server Listening...')
})
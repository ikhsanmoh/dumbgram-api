const express = require('express')
const app = express()

app.get('/api/v1/users', (req, res) => res.send('Hallo'))

app.listen(process.env.port || 5000, () => {
  console.log('Server Listening...')
})
const express = require('express')
const app = express()
const port = 3000;
const path = require('path')



app.use('/assets', express.static(path.join(__dirname, 'public')))

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))


app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
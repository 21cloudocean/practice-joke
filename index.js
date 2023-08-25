import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express()
const port = 3000
const URL = 'https://v2.jokeapi.dev/joke/Any?'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/joke', async (req, res) => {
  try {
    const inputName = req.body.name
    const result = await axios.get(`${URL}contains=${inputName}`)
    console.log(result.data)
    const error = result.data.error
    if (!error) {
      res.render('index.ejs', {
        message: `${result.data.setup}${result.data.delivery}`
      })
    } else {
      res.render('index.ejs', { error: 'No matching joke found' })
    }
  } catch (error) {
    console.log(error.message)
    res.render('index.ejs', { error: 'something went wrong...' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

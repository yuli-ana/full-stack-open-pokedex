const express = require('express')
const app = express()
const path = require('path')

// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

app.use('/', express.static(path.join(__dirname, './build')))

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('This is a new version, code has been updated yaay 🥳')
})

/*
 If Express sees a file path that it doesn't recognize, it should assume that it means it should show our React app and let react-router handle what part of our React app to display.
*/
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './dist/index.html'))
// })


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'))
  // add this part if you are using React Router
  app.get('*', (req,res) => {
    /* eslint-disable */
    console.log(path.join(__dirname+'/build/index.html'))
    res.sendFile(path.join(__dirname+'/build/index.html'))
  })
}

app.listen(PORT, () => {
  /* eslint-disable */
  console.log("server started on port 5000");
});

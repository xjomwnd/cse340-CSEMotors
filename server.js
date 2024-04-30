/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const path = require("path");
// Define the directory where your static files are located
const publicDirectoryPath = path.join(__dirname, 'public');
// Serve static files from the 'public' directory
app.use(express.static(publicDirectoryPath));
// Define a route to handle image requests
app.get('/images/:imageName', (req, res) => {
    const { imageName } = req.params;
    // Construct the path to the image file
    const imagePath = path.join(__dirname, 'public', 'images', imageName);
    // Open the image file
    open(imagePath).then(() => {
      console.log(`Opened ${imagePath}`);
      res.send(`Opened ${imageName}`);
    }).catch(error => {
      console.error(`Unable to open ${imagePath}: ${error}`);
      res.status(500).send('Unable to open image');
    });
});
// Other route handlers...


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root
/* ***********************
 * Routes
 *************************/
app.use(static)
// Add index route handler here
app.get("/", function(req, res){
  res.render("index", {title: "Home"})
})
app.get('/checkerboard', (req, res) => {
  res.render('checkerboard', { title: 'Checkerboard' });
});
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST
/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})


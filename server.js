/* ************************************************
 * This server.js file is the primary file of the *
 * application. It is used to control the project. *
 *************************************************/

/* ***************************
 * Require Statements *
 *****************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const .env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const path = require("path");
const utilities = require("./utilities/");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");


/* *********** Cherio ************** */
const cheerio = require('cheerio');

// Assuming your HTML content is stored in a variable called 'htmlContent'
const htmlContent = `
    <h3>DMC Delorean Reservations</h3>
    <p>Reservations Available</p>
`;

// Load the HTML content into cheerio
const $ = cheerio.load(htmlContent);

// Select the elements containing reservation information
const title = $('h3').text();
const availability = $('p').text();

// Print the reservation information
console.log(title);         // Output: DMC Delorean Reservations
console.log(availability);  // Output: Reservations Available

/* ******************************** */

// Define the directory where your static files are located
const publicDirectoryPath = path.join(__dirname, 'public');

// Serve static files from the 'public' directory
app.use(express.static(publicDirectoryPath));

// Define a route to handle image requests
app.get('/images/:imageName', (req, res) => {
  const { imageName } = req.params;
  console.log('imageName:', imageName); // Add this line to log the imageName
  const imagePath = path.join(__dirname, 'public', 'images', imageName);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(`Unable to send ${imagePath}: ${err}`);
      res.status(500).send('Unable to send image');
    } else {
      console.log(`Sent ${imagePath}`);
    }
  });
});
// Other route handlers...

/* ***************************
 * View Engine and Templates *
 *****************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***************************
 * Routes *
 *****************************/
app.use(static);

// Add index route handler here
app.get("/", baseController.buildHome);

utilities.handleErrors(baseController.buildHome);

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));
// Inventory routes
app.use("/inv", inventoryRoute);

app.get("/", function(req, res) {
  res.render("index", { title: "Home" });
});

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  });
});


/* ****************************************** */
app.get('/checkerboard', (req, res) => {
  res.render('checkerboard', { title: 'Checkerboard' });
});

/* ***************************
 * Local Server Information *
 * Values from .env (environment) file *
 *****************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***************************
 * Log statement to confirm server operation *
 *****************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
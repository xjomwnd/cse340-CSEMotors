// utilities.js
function handleErrors(fn) {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      console.error(err); // Log the error for now
      // You can also send an error response to the client here
      res.status(500).send("Internal Server Error");
    }
  };
}

module.exports = handleErrors;
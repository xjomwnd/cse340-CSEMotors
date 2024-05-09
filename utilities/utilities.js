// utilities.js
function handleErrors(fn) {
  return (req, res, next) => {
    try {
      // Execute the wrapped function
      fn(req, res, next);
    } catch (err) {
      // Log the error
      console.error(err);

      // Provide a more informative error response to the client (optional)
      if (process.env.NODE_ENV !== 'production') { // Avoid sensitive info in production
        res.status(500).send({ message: 'Internal server error', error: err.message });
      } else {
        res.status(500).send({ message: 'Internal server error' });
      }
    }
  };
}

module.exports = handleErrors;

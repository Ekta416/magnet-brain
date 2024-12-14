const errorHandler = (err, req, res, next) => {
    // Log the error (optional, for debugging purposes)
    console.error(`Error: ${err.message}`.red);
  
    // Determine the status code (use the one from error or default to 500)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      // Include stack trace only in development mode
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  module.exports = errorHandler;
  
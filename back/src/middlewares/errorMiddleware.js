function errorMiddleware(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error);
  res.status(error.statusCode).send({
    statusCode: error.statusCode,
    message: error.message, 
  });
}

export { errorMiddleware };

const notFound = (res, req, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.statuscode = 404;
  next(error);
};

const errorHandling = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    stack: error.stack,
  });
};

export { notFound, errorHandling };

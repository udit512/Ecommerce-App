const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${JSON.stringify(req.body)}`);
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

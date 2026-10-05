export function globalErrorHandler(error, req, res, next) {
  res.status(error.cause?.statusCode || 500).json({
    errmsg: error.message,
    errstack: error.stack,
    extra: error.cause?.issues,
  });
}

export default function errorHandler(err, req, res, next) {
  console.error('[ERROR]', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
}

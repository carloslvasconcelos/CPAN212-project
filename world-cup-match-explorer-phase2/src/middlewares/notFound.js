export default function notFound(req, res, next) {
  res.status(404).json({ success: false, error: { message: 'Not Found', path: req.originalUrl } });
}

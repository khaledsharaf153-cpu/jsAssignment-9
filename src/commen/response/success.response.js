export function successResponse({ res, statusCode, msg = "done", data }) {
  res.status(statusCode).json({ msg, data });
}

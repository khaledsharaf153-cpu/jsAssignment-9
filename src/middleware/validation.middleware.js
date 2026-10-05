import { BadrequestException } from "../commen/exceptions/app.exceptions.js";

export function validationMiddleware(schema) {
  return (req, res, next) => {
    const language = req.headers["accept-language"];

    const validateData = schema(language).safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!validateData.success) {
      throw BadrequestException({
        cause: { statusCode: 400, issues: validateData.error.issues },
      });
    }
    req.validateData = validateData;

    next();
  };
}

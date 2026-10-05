export function ConflictExceptions(
  errmsg = "Conflict",
  cause = { statusCode: 409 },
) {
  throw new Error(errmsg, { cause });
}

export function NotFoundException(
  errmsg = "Not found",
  cause = { statusCode: 404 },
) {
  throw new Error(errmsg, { cause });
}

export function UnauthorizedException(
  errmsg = "Unauthorized",
  cause = { statusCode: 401 },
) {
  throw new Error(errmsg, { cause });
}

export function BadrequestException({
  errmsg = "Bad request",
  cause = { statusCode: 400 },
}) {
  throw new Error(errmsg, { cause });
}

export function ForbiddenException(
  errmsg = "Forbidden",
  cause = { statusCode: 403 },
) {
  throw new Error(errmsg, { cause });
}

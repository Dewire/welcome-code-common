import {
  OK_200,
  BAD_REQUEST_400, UNAUTHORIZED_401, NOT_FOUND_404,
  METHOD_NOT_ALLOWED_405, INTERNAL_ERROR_500, NOT_IMPLEMENTED_501,
} from './httpStatus';
import { ResponseBuilder } from './ResponseBuilder';

export const success = (body) => {
  const res = new ResponseBuilder()
    .status(OK_200)
    .setCORS();
  if (body !== undefined) {
    res.json(body);
  }
  return res.build();
};

export const badRequest = body => new ResponseBuilder()
  .status(BAD_REQUEST_400)
  .json({ errorMessage: body })
  .setCORS()
  .build();

export const unauthorized = msg => new ResponseBuilder()
  .status(UNAUTHORIZED_401)
  .json({ error: msg })
  .setCORS()
  .build();

export const notFound = (body) => {
  if (body.stack) {
    // eslint-disable-next-line no-param-reassign
    body = body.stack.split('\n');
  }
  return new ResponseBuilder()
    .status(NOT_FOUND_404)
    .json({ error: body })
    .setCORS()
    .build();
};

export const internalError = (body) => {
  if (body.stack) {
    // eslint-disable-next-line no-param-reassign
    body = body.stack.split('\n');
  }
  return new ResponseBuilder()
    .status(INTERNAL_ERROR_500)
    .json({ error: body })
    .setCORS()
    .build();
};
export const error = internalError;

export const notImplemented = body => new ResponseBuilder()
  .status(NOT_IMPLEMENTED_501)
  .json({ error: (body || 'Not implemented yet.') })
  .setCORS()
  .build();

export const methodNotAllowed = body => new ResponseBuilder()
  .status(METHOD_NOT_ALLOWED_405)
  .json({ error: body || 'This method is not allowed.' })
  .setCORS()
  .build();

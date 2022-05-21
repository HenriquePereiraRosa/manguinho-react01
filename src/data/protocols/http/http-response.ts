export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  internalError = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode
}
const CONTENT_TYPE_HEADER = 'Content-Type';

export class ResponseBuilder {
  constructor() {
    this.response = {
      statusCode: undefined,
      headers: {},
      body: undefined,
    };
  }
  status(value) {
    this.response.statusCode = value;
    return this;
  }
  json(value) {
    this.response.headers[CONTENT_TYPE_HEADER] = 'application/json; charset=utf-8';
    this.response.body = JSON.stringify(value);
    return this;
  }
  text(value) {
    this.response.headers[CONTENT_TYPE_HEADER] = 'text/plain; charset=utf-8';
    this.response.body = value;
    return this;
  }
  setCORS() {
    this.response.headers['Access-Control-Allow-Origin'] = '*';
    this.response.headers['Access-Control-Allow-Credentials'] = true;
    return this;
  }
  build() {
    return this.response;
  }
}

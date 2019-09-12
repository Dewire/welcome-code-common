import { ResponseBuilder } from './ResponseBuilder';

describe('ResponseBuilder', () => {
  describe('Constructor', () => {
    it('Should create an empty response when constructed', () => {
      expect(new ResponseBuilder().response).toEqual({
        statusCode: undefined,
        headers: {},
        body: undefined,
      });
    });
  });

  describe('status(statusCode)', () => {
    it('Should set the value', () => {
      expect(new ResponseBuilder().status(404).build()).toEqual({
        statusCode: 404,
        headers: {},
        body: undefined,
      });
    });
  });

  describe('json(body)', () => {
    it('Should add content type when adding json body', () => {
      expect(new ResponseBuilder().json({}).build()).toEqual({
        statusCode: undefined,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({}),
      });
    });

    it('Should add the parameter as body', () => {
      expect(new ResponseBuilder().json({ foo: 'bar' }).build())
        .toEqual({
          statusCode: undefined,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            foo: 'bar',
          }),
        });
    });
  });
});

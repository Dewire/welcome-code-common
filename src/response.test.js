import { success } from './response';

const contentTypeHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
};
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

describe('Success', () => {
  it('Should add headers and body undefined if input undefined', () => {
    const expectedHeaders = {
        headers: {
        ...corsHeaders,
      }
    };
    const actual = success();
    expect(actual).toBeDefined();
    expect(typeof actual).toBe('object');
    expect(actual).toMatchObject({ statusCode: 200 });
    expect(actual).toMatchObject(expectedHeaders);
    expect(actual).toMatchObject({
      body: undefined,
    });
  });
  it('Should return a body with an empty string if an empty string is passed as paramter.', () => {
    const input = '';
    const expectedHeaders = {
        headers: {
        ...corsHeaders,
        ...contentTypeHeaders,
      }
    };
    const actual = success(input);
    expect(actual).toBeDefined();
    expect(typeof actual).toBe('object');
    expect(actual).toMatchObject({ statusCode: 200 });
    expect(actual).toMatchObject(expectedHeaders);
    expect(actual).toHaveProperty('body');
    expect(actual).toMatchObject({});
  });
  it('Should return a body with the object if an object is passed as parameter.', () => {
    const input = {
      foo: {
        bar: 'string',
      },
    };
    const expectedHeaders = {
        headers: {
        ...corsHeaders,
        ...contentTypeHeaders,
      }
    };
    const actual = success(input);
    expect(actual).toMatchObject({ statusCode: 200 });
    expect(actual).toMatchObject(expectedHeaders);
    expect(actual).toMatchObject({ body: JSON.stringify(input) });
  });
});

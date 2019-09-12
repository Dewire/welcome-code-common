/* eslint-disable no-use-before-define */
describe('EncryptionService', () => {
  describe('Encrypt', () => {
    beforeEach(() => {
      jest
        .clearAllMocks()
        .resetAllMocks()
        .restoreAllMocks()
        .resetModules();
    });
    it('Should use password parameter when awailable.', () => encryptUseEncParamFirst());
    it('Should use password from configuration if parameter is not passed.', () => encryptConfigAsDefault());
    it('Should throw an informative error if neither parameter nor configuration pass is available.', () => encryptErrorOnNoEncPass());
    it('Should convert an object to JSON string before encrypting.', () => encryptConvertObjects());
  });
  describe('Decrypt', () => {
    beforeEach(() => {
      jest
        .clearAllMocks()
        .resetAllMocks()
        .restoreAllMocks()
        .resetModules();
    });
    it('Should use password parameter when awailable.', () => decryptUseEncParamFirst());
    it('Should use password from configuration if parameter is not passed.', () => decryptConfigAsDefault());
    it('Should throw an informative error if neither parameter nor configuration pass is available.', () => decryptErrorOnNoEncPass());
  });
});

//--------------
// Encrypt
//--------------
const encryptUseEncParamFirst = () => {
  jest.doMock('./config', () => ({
    ENC_PASS: 'bar',
  }));
  jest.doMock('sjcl', () => ({
    encrypt: jest.fn(),
  }));
  const { encrypt } = require('sjcl');
  encrypt.mockReturnValue('retVal');
  expect(require('./encryptionService').encryptString('data', 'foo')).toEqual('retVal');
  expect(encrypt).toHaveBeenCalledWith('foo', 'data');
};

const encryptConfigAsDefault = () => {
  jest.doMock('./config', () => ({
    ENC_PASS: 'bar',
  }));
  jest.doMock('sjcl', () => ({
    encrypt: jest.fn(),
  }));
  const { encrypt } = require('sjcl');
  require('./encryptionService').encryptString('data');
  expect(encrypt).toHaveBeenCalledWith('bar', 'data');
};

const encryptErrorOnNoEncPass = () => {
  jest.doMock('./config', () => ({}));
  jest.doMock('sjcl', () => ({
    encrypt: jest.fn(),
  }));
  const { encrypt } = require('sjcl');
  expect(() => require('./encryptionService').encryptString('data')).toThrow('No encryption password provided.');
  expect(encrypt).not.toHaveBeenCalled();
};

const encryptConvertObjects = () => {
  jest.doMock('./config', () => ({
    ENC_PASS: 'bar',
  }));
  jest.doMock('sjcl', () => ({
    encrypt: jest.fn(),
  }));
  const { encrypt } = require('sjcl');
  require('./encryptionService').encryptString(['data']);
  expect(encrypt).toHaveBeenCalledWith('bar', JSON.stringify(['data']));
};

//--------------
// Decrypt
//--------------

const decryptUseEncParamFirst = () => {
  jest.doMock('./config', () => ({
    ENC_PASS: 'bar',
  }));
  jest.doMock('sjcl', () => ({
    decrypt: jest.fn(),
  }));
  const { decrypt } = require('sjcl');
  decrypt.mockReturnValue('retVal');
  expect(require('./encryptionService').decryptString('input', 'key')).toEqual('retVal');
  expect(decrypt).toHaveBeenCalledWith('key', 'input');
};

const decryptConfigAsDefault = () => {
  jest.doMock('./config', () => ({
    ENC_PASS: 'bar',
  }));
  jest.doMock('sjcl', () => ({
    decrypt: jest.fn(),
  }));
  const { decrypt } = require('sjcl');
  require('./encryptionService').decryptString('data');
  expect(decrypt).toHaveBeenCalledWith('bar', 'data');
};

const decryptErrorOnNoEncPass = () => {
  jest.doMock('./config', () => ({}));
  jest.doMock('sjcl', () => ({
    decrypt: jest.fn(),
  }));
  const { decrypt } = require('sjcl');
  expect(() => require('./encryptionService').decryptString('data')).toThrow('No encryption password provided.');
  expect(decrypt).not.toHaveBeenCalled();
};

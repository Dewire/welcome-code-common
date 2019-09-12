import * as sjcl from 'sjcl';
import { ENC_PASS } from './config';

export const encryptString = (data, encPass) => {
  if (!(encPass || ENC_PASS)) {
    throw new Error('No encryption password provided.');
  }
  let plaintext = data;
  if (!(typeof data === 'string' || data instanceof String)) {
    plaintext = JSON.stringify(plaintext);
  }
  return sjcl.encrypt(encPass || ENC_PASS, plaintext);
};
export const decryptString = (encData, encPass) => {
  if (!(encPass || ENC_PASS)) {
    throw new Error('No encryption password provided.');
  }
  return sjcl.decrypt(encPass || ENC_PASS, encData);
};

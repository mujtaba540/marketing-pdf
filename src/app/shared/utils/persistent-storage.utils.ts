// ------- This file contains functions to handle persistent storage functions ----------
import { AES, enc } from 'crypto-js';
import { environment } from '../../../environments/environment';

export function setItem(key: string, value: string) {
  const encrypted = AES.encrypt(
    value,
    environment.LOCAL_STORAGE_SECRET
  ).toString();
  localStorage.setItem(key, encrypted);
}

export function getItem(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    const decrypted = AES.decrypt(
      data,
      environment.LOCAL_STORAGE_SECRET
    ).toString(enc.Utf8);
    try {
      return JSON.parse(decrypted);
    } catch (e) {
      return decrypted;
    }
  }
  return null;
}

export function deleteItem(key: string) {
  localStorage.removeItem(key);
}

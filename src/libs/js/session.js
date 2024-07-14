
import { appConfig } from '@/config/app';

export const sessionLib = {
  set: s => {
    localStorage.setItem(appConfig.tokenKey, s);
  },
  get: () => {
    return localStorage.getItem(appConfig.tokenKey);
  },
  clear: () => {
    localStorage.removeItem(appConfig.tokenKey);
  }
};

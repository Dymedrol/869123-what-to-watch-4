import axios from 'axios';
import history from './history.js';

import {AppRoute} from './const.js';

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    onUnauthorized();
    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

import axios from 'axios';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    const {response} = err;
    alert(`При загрузке ${response.config.url} возникла ошибка: ${err}`);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
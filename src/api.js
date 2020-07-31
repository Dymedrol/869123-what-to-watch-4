import axios from 'axios';

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    onUnauthorized();
    // const node = document.createElement(`div`);
    // node.style.cssText = `z-index: 9999; margin: auto; text-align: center; position: fixed; top: 0; right: 0; bottom: 0; left: 0; fontSize: 24px; color: #fff; background-color: red;`;
    // node.textContent = `Внимание, возникла ошибка: ${err}`;
    // document.body.insertAdjacentElement(`afterbegin`, node);
    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};

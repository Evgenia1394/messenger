export const BASE_REQUEST_URL = 'ya-praktikum.tech/api/v2';

// function fetchWithRetry(url, options={ retries: 1 }) {
//     const {retries} = options;
//     let errorsCount = 0;
//     return new HTTPTransport().get(url)
//         .then(response => {
//             return response})
//         .catch(error => {
//             errorsCount+=1
//             if (errorsCount>retries) {
//                 throw new Error();
//             } else {
//                 fetchWithRetry(url, options={ retries: retries })
//             }
//         })
// }

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
function queryStringify(data: any) {
  const res = [];
  for (const [key, value] of Object.entries(data)) {
    if (
      typeof value === 'string'
            || typeof value === 'number'
            || typeof value === 'boolean'
    ) {
      res.push(`${key}=${value}`);
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      res.push(`${key}=[object Object]`);
    }
    if (Array.isArray(value)) {
      res.push(`${key}=${value.join()}`);
    }
  }
  return `${res.join('&').trim()}`;
}

export class HTTPTransport {
  get = (url: string, options?: any) => {
    const timeout = options?.timeout ?? 5000;
    return this.request(url, options, METHODS.GET, timeout);
  };

  put = (url: string, options?: any) => {
    const timeout = options?.timeout ?? 5000;
    return this.request(url, options, METHODS.PUT, timeout);
  };

  post = (url: string, options?: any) => {
    const timeout = options?.timeout ?? 5000;
    return this.request(url, options, METHODS.POST, timeout);
  };

  delete = (url: string, options = { timeout: 5000, headers: {}, data: {} }) => {
    const timeout = options?.timeout ?? 5000;
    return this.request(url, options, METHODS.DELETE, timeout);
  };

  request = (url: string, options: any, method: string, timeout = 5000) => {
    let headers = options?.headers ?? {};
    let data = options?.data ?? null;
    if (options) {
      headers = options.options;
      data = options.data;
    } else {
      headers = null;
      data = null;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      if (method === METHODS.GET || !data) {
        if (data) {
          url = `${url}?${queryStringify(data)}`;
        } else {
          url = url;
        }
      }
      xhr.open(method, `https://${BASE_REQUEST_URL}${url}`, true);
      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value as string);
        });
      }
      xhr.withCredentials = true;
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };

  // TODO: доделать универсальный метод
  // normalizeResponse(data: unknown) {
  //     let resData: any;
  //     data.then((data: any) => {
  //         resData = JSON.parse((data as XMLHttpRequest).responseText);
  //     }).catch(error => {
  //         console.error('Ошибка:', error);
  //     });
  // }
}

import axios, { AxiosInstance } from 'axios';
import { BasicGETRequestOptions } from './http.types';

function http({ requester }: { requester: AxiosInstance }) {
  // eslint-disable-next-line consistent-return
  async function get({
    url,
    ...options
  }: BasicGETRequestOptions): Promise<{
    body?: any;
    headers?: any;
    statusText?: any;
    status?: any;
    error?: any;
  }> {
    try {
      const response = await requester.get(url, options);
      return Object.freeze({
        body: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      });
    } catch (error) {
      if (!error.response) {
        return {
          error: {
            ...error.toJSON(),
            status: 500,
            statusText: 'Server Error',
          },
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      return {
        error: {
          ...error.toJSON(),
          status: error.response.status,
          statusText: error.response.statusText,
        },
      };
    }
  }

  return Object.freeze({
    get,
  });
}

export default http({ requester: axios });

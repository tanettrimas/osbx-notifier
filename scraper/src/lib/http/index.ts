import axios, { AxiosInstance } from 'axios';
import { BasicGETRequestOptions, BasicResponse } from './http.types';

function http({ requester }: { requester: AxiosInstance }) {
  // eslint-disable-next-line consistent-return
  async function get({ url, ...options }: BasicGETRequestOptions): Promise<BasicResponse> {
    try {
      const response = await requester.get(url, options);
      return Object.freeze({
        body: response.data,
        status: response.status,
        statusText: response.statusText,
      });
    } catch (error) {
      const {
        message,
        name,
        config: { url: errorUrl },
      } = error.toJSON();

      if (!error.response) {
        return {
          status: 500,
          statusText: 'Internal server error',
          error: {
            message,
            name,
            url: errorUrl,
          },
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        error: {
          message,
          url: errorUrl,
        },
      };
    }
  }

  return Object.freeze({
    get,
  });
}

export default http({ requester: axios });

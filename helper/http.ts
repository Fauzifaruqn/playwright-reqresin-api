import { APIRequestContext } from '@playwright/test';
import { headers } from '../variables';

export const http = {
  async get(request: APIRequestContext, endpoint: string) {
    return request.get(endpoint, { headers });
  },

  async post(request: APIRequestContext, endpoint: string, data: object) {
    return request.post(endpoint, {
      headers,
      data,
    });
  },

  async put(request: APIRequestContext, endpoint: string, data: object) {
    return request.put(endpoint, {
      headers,
      data,
    });
  },

  async delete(request: APIRequestContext, endpoint: string) {
    return request.delete(endpoint, { headers });
  },
};

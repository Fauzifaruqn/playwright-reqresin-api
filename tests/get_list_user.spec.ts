import { test, expect } from '@playwright/test';
import { http } from '../helper/http';
import { logResponse } from '../helper/utils';
import { userListSchema, SingleUserSchema } from '../schemas/userSchema';

import { validateUserListWithoutParam } from '../validations/userValidations';
import { validator } from '../helper/validator';

test.describe('[GET] List Users API Tests', () => {

  test('List User Without Parameter',{
    tag: ['@listuser','@list_user_without_param'],
  }, async ({ request }) => {
        const startTime = Date.now();  // Start time tracking
        const response = await http.get(request, '/api/users');
        const endTime = Date.now();
        const responseBody = await response.json();
        const perPage = responseBody.per_page;
        await logResponse(response);
        await validateUserListWithoutParam(response);
        await validator.validateResponseTime(startTime, endTime, 2000);
        await validator.validateArraySize(response, 'data',perPage)    
  });

  test('List users with page parameter',{
    tag: ['@listuser','@list_user_page'],
  }, async ({ request }) => {
        const page = 2; 
        const startTime = Date.now();  // Start time tracking
        const response = await http.get(request, `/api/users?page=${page}`);
        const endTime = Date.now();
        await logResponse(response);
        await validator.validateStatusCode(response, 200);
        await validator.validateResponseBody(response, 'page', page);
        await validator.validateResponseTime(startTime, endTime, 2000);
  });

  test('List users with page and per_page parameters',{
    tag: ['@listuser','@list_user_per_page'],
  }, async ({ request }) => {
        const page = 1; 
        const per_page = 3;
        const startTime = Date.now();  // Start time tracking
        const response = await http.get(request, `/api/users?page=${page}&per_page=${per_page}`);
        const endTime = Date.now();
        await logResponse(response);
        await validator.validateStatusCode(response, 200);
        await validator.validateResponseBody(response, 'page', page);
        await validator.validateResponseBody(response, 'per_page', per_page);
        await validator.validateResponseTime(startTime, endTime, 2000);
        await validator.validateArraySize(response, 'data',per_page)    
        await validator.validateResponseSchema(response, userListSchema);
  });

  test('List users with page not data exist',{
    tag: ['@listuser','@list_user_page_not_exist'],
  }, async ({ request }) => {
        const startTime = Date.now();  // Start time tracking
        const response = await http.get(request, `/api/users?page=123123123`);
        const endTime = Date.now();
        await logResponse(response);
        await validator.validateStatusCode(response, 200);
        await validator.validateResponseTime(startTime, endTime, 2000);
        await validator.validateArraySize(response, 'data',0)    
  });

  test('Single User',{
    tag: ['@listuser','@single_user'],
  }, async ({ request }) => {
        const id = 4; 
        const startTime = Date.now();  // Start time tracking
        const response = await http.get(request, `/api/users/${id}`);
        const endTime = Date.now();
        await logResponse(response);
        await validator.validateStatusCode(response, 200);
        await validator.validateResponseTime(startTime, endTime, 2000); 
        await validator.validateNestedResponseBody(response, ['data','id'], id);
        await validator.validateResponseSchema(response, SingleUserSchema);
        
  });
  
  test('List users with id not exist',{
    tag: ['@listuser','@list_user_page_not_exist'],
  }, async ({ request }) => {
        const startTime = Date.now();  // Start time tracking
        const response = await http.get(request, `/api/users/12312312331`);
        const endTime = Date.now();
        await logResponse(response);
        await validator.validateStatusCode(response, 404);
        await validator.validateResponseTime(startTime, endTime, 2000);
  });

});

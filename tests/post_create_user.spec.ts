import { test, expect } from '@playwright/test';
import { http } from '../helper/http';
import { logResponse } from '../helper/utils';
import {  generateCreateUserPayload, generateUpdateUserPayload  } from '../payloads/userPayloads';
import { validateUserCreation, validateUserUpdate } from '../validations/userValidations';
import { validator } from '../helper/validator';

test.describe('[POST] Create Users API Tests', () => {

  test('Create a new user',{
    tag: ['@createuser'],
  },  async ({ request }) => {
    // Uses the request context with baseURL from the config

    const createUserPayload = generateCreateUserPayload();

    await test.step('Send Post request to create a new user', async () => {

        const startTime = Date.now();  // Start time tracking
        const response = await http.post(request, '/api/users', createUserPayload);
        const endTime = Date.now();
        await logResponse(response);
        await validateUserCreation(response,createUserPayload);
        await validator.validateResponseTime(startTime, endTime, 2000);
    })
    
    
  });

  test('Update an existing user', {
    tag: ['@updateuser'],
  }, async ({ request }) => {
    const updateUserPayload = generateUpdateUserPayload();
    const response = await http.put(request, '/api/users/2', updateUserPayload);
    await logResponse(response);
    await validateUserUpdate(response, updateUserPayload);
  });

});

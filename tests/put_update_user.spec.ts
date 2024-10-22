import { test, expect } from '@playwright/test';
import { http } from '../helper/http';
import { logResponse } from '../helper/utils';
import {  generateUpdateUserPayload  } from '../payloads/userPayloads';
import { validateUserUpdate } from '../validations/userValidations';

test.describe('User API Tests', () => {


  test('Update an existing user', {
    tag: ['@updateuser'],
  }, async ({ request }) => {

    const updateUserPayload = generateUpdateUserPayload();
    const response = await http.put(request, '/api/users/2', updateUserPayload);
    await logResponse(response);
    await validateUserUpdate(response, updateUserPayload);
  });

});

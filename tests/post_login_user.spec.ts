import { test, expect } from '@playwright/test';
import { http } from '../helper/http';
import { logResponse } from '../helper/utils';
import { validateSucessLogin, validateUnsucessLogin } from '../validations/userValidations';
import { validator } from '../helper/validator';

test.describe('[POST] User Login', () => {

  test('Login API ', {
    tag: ['@login'],
  }, async ({ request }) => {
    // Uses the request context with baseURL from the config
    await test.step('Send Post Request Login Sucessfull', async () => {

        const userLoginSucessPayload = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }

        const startTime = Date.now();  // Start time tracking
        const response = await http.post(request, '/api/login', userLoginSucessPayload);
        const endTime = Date.now();
        await logResponse(response);
        await validateSucessLogin(response);
        await validator.validateResponseTime(startTime, endTime, 2000);
    })
    
    await test.step('Send Post Request Login Unsucessfull', async () => {

        const userLoginUnsucessPayload = {
            name: "peter@klaven"
        }

        const startTime = Date.now();  // Start time tracking
        const response = await http.post(request, '/api/login', userLoginUnsucessPayload);
        const endTime = Date.now();
        await logResponse(response);
        await validateUnsucessLogin(response);
        await validator.validateResponseTime(startTime, endTime, 2000);
    })
  });



});

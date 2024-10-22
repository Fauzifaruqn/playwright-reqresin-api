import { test } from '@playwright/test';
import { http } from '../helper/http';
import { logResponse } from '../helper/utils';
import { validator } from '../helper/validator';
import {  generateRegisterUserPayload  } from '../payloads/userPayloads';
import { RegisterSuccessSchema, RegisterUnsuccessSchema } from '../schemas/userSchema';
import { validateRegisterUserSucess, validateRegisterUserUnSucess } from '../validations/userValidations';

test.describe('[POST] Register User API Tests', () => {

    test('Register success - should return id and token',{
        tag: ['@register','@registersucess'],
      }, async ({ request }) => {
        const registerPayload = generateRegisterUserPayload()
        console.log("Cek Register Payload", registerPayload)
    
        const response = await http.post(request, '/api/register', registerPayload);
        await logResponse(response);
        await validateRegisterUserSucess(response)
      });
    
      // Test case: Register unsuccessful (missing password)
      test('Register unsuccessful - should return missing password error', {
        tag: ['@register','@registerunsuccess'],
      }, async ({ request }) => {
        const registerPayload = {
          email: 'sydney@fife'
        };
        const response = await http.post(request, '/api/register', registerPayload);
        await logResponse(response);
        await validateRegisterUserUnSucess(response)
      });
    
});

import { APIResponse } from '@playwright/test';
import { validator } from '../helper/validator';
import { CreateUserSchema, RegisterSuccessSchema, RegisterUnsuccessSchema,LoginSucessSchema, LoginUnsucessSchema, userListSchema } from '../schemas/userSchema';
import { UserPayload } from '../types/user'; 


export const validateUserListWithoutParam = async (response: APIResponse) => {
    await validator.validateStatusCode(response, 200);
    await validator.validateResponseBody(response, 'page', 1);
    await validator.validateResponseBody(response, 'per_page', 6);
    await validator.validateResponseBody(response, 'total', 12);
    await validator.validateResponseBody(response, 'total_pages', 2);
    await validator.validateResponseSchema(response, userListSchema);
}

export const validateUserCreation = async (response: APIResponse, createUserPayload: UserPayload) => {
  await validator.validateStatusCode(response, 201);
  await validator.validateResponseBody(response, 'name', createUserPayload.name);
  await validator.validateResponseBody(response, 'job', createUserPayload.job);
  await validator.validateResponseSchema(response, CreateUserSchema);
};

export const validateUserUpdate = async (response: APIResponse, updateUserPayload: UserPayload) => {
  await validator.validateStatusCode(response, 200);
  await validator.validateResponseBody(response, 'name', updateUserPayload.name);
  await validator.validateResponseBody(response, 'job', updateUserPayload.job);
};


export const validateRegisterUserSucess = async (response: APIResponse) => {
  await validator.validateStatusCode(response, 200);
  await validator.validateResponseBody(response, 'id', 4);
  await validator.validateResponseBody(response, 'token', 'QpwL5tke4Pnpja7X4');
  await validator.validateResponseSchema(response, RegisterSuccessSchema);
}

export const validateRegisterUserUnSucess = async (response: APIResponse) => {
  await validator.validateStatusCode(response, 400);
  await validator.validateResponseBody(response, 'error', 'Missing password');
  await validator.validateResponseSchema(response, RegisterUnsuccessSchema);
}

export const validateSucessLogin = async (response: APIResponse) => {
  await validator.validateStatusCode(response, 200)
  await validator.validateResponseBody(response, 'token', 'QpwL5tke4Pnpja7X4');
  await validator.validateResponseSchema(response,LoginSucessSchema );
}

export const validateUnsucessLogin = async (response: APIResponse) => {
  await validator.validateStatusCode(response, 400)
  await validator.validateResponseBody(response, 'error', 'Missing email or username');
  await validator.validateResponseSchema(response,LoginUnsucessSchema );
}
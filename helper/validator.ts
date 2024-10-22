import { expect, APIResponse } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv();
export const validator = {
  // Validate that the status code matches the expected value
  validateStatusCode: async (response: APIResponse, expectedStatusCode: number) => {
    expect(response.status(),`Validate status code is ${response.status()}`).toBe(expectedStatusCode);
  },

  // Validate response body contains a specific key-value pair
  validateResponseBody: async (response: APIResponse, key: string, expectedValue: any) => {
    const responseBody = await response.json();
    expect(responseBody[key],`Response Contains KEY : ${key} and VALUE: ${expectedValue}`).toBe(expectedValue);
  },
  validateNestedResponseBody: async (response: APIResponse, path: string[], expectedValue: any) => {
    const responseBody = await response.json();

    // Traverse the response body to reach the nested property
    let currentValue = responseBody;
    for (const key of path) {
      currentValue = currentValue[key];
    }

    // Perform the validation
    expect(currentValue,`Response ${path} contains ${currentValue}`).toBe(expectedValue);
  },

  // Validate if the response body has a specific structure or fields
  validateResponseStructure: async (response: APIResponse, expectedStructure: string[]) => {
    const responseBody = await response.json();
    expectedStructure.forEach(key => {
      expect(responseBody).toHaveProperty(key);
    });
  },

  // Validate array size in the response body
  validateArraySize: async (response: APIResponse, key: string, expectedSize: number) => {
    const responseBody = await response.json();
    expect(responseBody[key].length, `Total ${key} is ${expectedSize}` ).toBe(expectedSize);
  },
  

  // Manually calculate and validate that the response time is within the expected limit (in milliseconds)
  validateResponseTime: (startTime: number, endTime: number, maxResponseTime: number) => {
    const responseTime = endTime - startTime;
    console.log(`Response time: ${responseTime} ms`);
    expect(responseTime,`Response time : ${responseTime} and should be less than ${maxResponseTime}`).toBeLessThanOrEqual(maxResponseTime);
  },

  // Validate that the response body contains a specific value in an array
  validateArrayContainsValue: async (response: APIResponse, key: string, expectedValue: any) => {
    const responseBody = await response.json();
    expect(Array.isArray(responseBody[key])).toBeTruthy();
    expect(responseBody[key]).toContain(expectedValue);
  },

  // Validate if a field value matches a specific type
  validateFieldType: async (response: APIResponse, key: string, expectedType: string) => {
    const responseBody = await response.json();
    expect(typeof responseBody[key]).toBe(expectedType);
  },

  // Check if a field is not present in the response body
  validateFieldAbsent: async (response: APIResponse, key: string) => {
    const responseBody = await response.json();
    expect(responseBody,`Response should not cotains ${key}`).not.toHaveProperty(key);
  },

    // Validate response against a JSON schema
  validateResponseSchema: async (response: APIResponse, schema: object) => {
    const responseBody = await response.json();
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    
    if (!valid) {
        console.error('Schema validation errors:', validate.errors);
    }
    
    expect(valid, `Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`).toBeTruthy();
    },
    
};


# Playwright API Testing Repository


This project is a Playwright-based API testing framework using TypeScript. It includes test cases for various API endpoints, using dynamic data generation (via Faker.js) and validation mechanisms to ensure the correctness of API responses. The project is structured for maintainability, scalability, and flexibility.
## Prerequisites
Make sure you have the following installed:

- Node.js (version 14 or higher)
- Playwright
- npm or yarn package manager


## Installation
Clone the repository and install dependencies:


```bash
git clone https://github.com/your-username/playwright-api-tests.git
cd playwright-api-tests
npm install
npx playwright install
```
    
## Running Tests - All Test
To run all the tests in the project:


```bash
npx playwright test
```

## Running Tests - Run Tests with a Tag
You can tag specific tests using the .only() or .skip() functions in Playwright, or use the @tag annotation.


```bash
npx playwright test --grep @user
```

## Generate Playwright HTML Report
After running tests, you can generate an HTML report. To do this, run the following command:


```bash
npx playwright show-report
```

## Folder Structure Breakdown
After running tests, you can generate an HTML report. To do this, run the following command:


### `helpers/`
Contains utility and helper functions to avoid repetition and keep the test code clean and DRY.

- `http.ts`: Manages common HTTP methods like GET, POST, PUT, and DELETE using Playwright's request API.

- `utils.ts`: Utility functions, such as logging responses to the console.
- `validator.ts`: Contains custom validation functions for asserting API responses (e.g., status code, response body, nested properties).

### `payloads/`
Contains predefined or dynamically generated payloads for API requests.
- `userPayloads.ts`: Defines both static and dynamic payloads (using Faker.js) for creating and updating users.

### `tests/'
Holds all test files. Each test file contains API test cases for specific endpoints.

### `validations/`
Contains reusable validation logic to validate API responses.

### `schemas/`
Contains JSON schemas used for validating the structure of API responses.
import { faker } from '@faker-js/faker';

export const generateCreateUserPayload = () => {
    return {
        name: faker.person.fullName(),
        job: faker.person.jobTitle(),
    };
};

export const generateUpdateUserPayload = () => {
    return {
        name: faker.person.fullName(),
        job: faker.person.jobTitle(),
    };
};


export const generateRegisterUserPayload = () => {
    return {
        email: 'eve.holt@reqres.in',
        password: faker.internet.password(),
    };
};
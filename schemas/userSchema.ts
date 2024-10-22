export const CreateUserSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      job: { type: 'string' },
      createdAt: { type: 'string' },
    },
    required: ['id', 'name', 'job', 'createdAt'],
    additionalProperties: false,  // Ensures no extra properties are present
};

export const RegisterSuccessSchema  = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    token: { type: 'string' },
  },
  required: ['id', 'token'],
  additionalProperties: false, 
}


export const RegisterUnsuccessSchema  = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
  required: ['error'],
  additionalProperties: false, 
}


export const LoginSucessSchema  = {
  type: 'object',
  properties: {
    token: { type: 'string' },
  },
  required: ['token'],
  additionalProperties: false, 
}

export const LoginUnsucessSchema  = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
  required: ['error'],
  additionalProperties: false, 
}

export const userListSchema = {
  type: 'object',
  properties: {
    page: { type: 'integer' },
    per_page: { type: 'integer' },
    total: { type: 'integer' },
    total_pages: { type: 'integer' },
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          email: { type: 'string'},
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          avatar: { type: 'string' }
        },
        required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
        additionalProperties: false
      }
    },
    support: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        text: { type: 'string' }
      },
      required: ['url', 'text'],
      additionalProperties: false
    }
  },
  required: ['page', 'per_page', 'total', 'total_pages', 'data', 'support'],
  additionalProperties: false
}

export const SingleUserSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        avatar: { type: 'string' }
      },
      required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
      additionalProperties: false
    },
    support: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        text: { type: 'string' }
      },
      required: ['url', 'text'],
      additionalProperties: false
    }
  },
  required: ['data', 'support'],
  additionalProperties: false
}

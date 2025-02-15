const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const Ajv = require('ajv');
const fetch = require('node-fetch');

chai.use(chaiJsonSchema);
const expect = chai.expect;

const ajv = new Ajv();

const createUserSchema = {
  type: 'object',
  required: ['name', 'job', 'id', 'createdAt'],
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    id: { type: 'string' },
    createdAt: { type: 'string' }
  }
};

describe('POST Create User', function () {
  it('should create a new user successfully', async function () {
    this.timeout(10000);
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'morpheus',
        job: 'leader'
      })
    });
    const responseData = await response.json();

    expect(response.status).to.equal(201);
    expect(responseData).to.be.jsonSchema(createUserSchema);
  });
});

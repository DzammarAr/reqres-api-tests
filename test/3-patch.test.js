const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const Ajv = require('ajv');
const fetch = require('node-fetch');

chai.use(chaiJsonSchema);
const expect = chai.expect;

const ajv = new Ajv();

const updateUserSchema = {
  type: 'object',
  required: ['name', 'job', 'updatedAt'],
  properties: {
    name: { type: 'string' },
    job: { type: 'string' },
    updatedAt: { type: 'string' }
  }
};

describe('PATCH Update User', function () {
  it('should update user details successfully', async function () {
    this.timeout(10000);
    const response = await fetch('https://reqres.in/api/users/2', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'morpheus',
        job: 'zion resident'
      })
    });
    const responseData = await response.json();

    expect(response.status).to.equal(200);
    expect(responseData).to.be.jsonSchema(updateUserSchema);
  });
});

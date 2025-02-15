const chai = require('chai');
const chaiJsonSchema = require('chai-json-schema');
const Ajv = require('ajv');
const fetch = require('node-fetch');

chai.use(chaiJsonSchema);
const expect = chai.expect;

const ajv = new Ajv();

const userSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        avatar: { type: 'string' }
      }
    }
  }
};

describe('GET User Details', function () {
  it('should return user details successfully', async function () {
    this.timeout(10000);
    const response = await fetch('https://reqres.in/api/users/2');
    const responseData = await response.json();

    expect(response.status).to.equal(200);
    expect(responseData).to.be.jsonSchema(userSchema);
  });
});

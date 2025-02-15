const chai = require('chai');
const fetch = require('node-fetch');

const expect = chai.expect;

describe('DELETE User', function () {
  it('should delete user successfully', async function () {
    this.timeout(10000);
    const response = await fetch('https://reqres.in/api/users/2', {
      method: 'DELETE'
    });

    expect(response.status).to.equal(204);
  });
});

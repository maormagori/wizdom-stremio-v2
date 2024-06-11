const request = require('supertest');
const assert = require('assert');
const manifest = require('../data/manifest.mock.js');
const version = require('../../../package.json').version;

describe('Manifest', () => {
  before(() => {
    process.env.npm_package_version = version;
  });
  it("should return 200 and addon's manifest", async () => {
    const addon = require('../../../server');

    const response = await request(addon)
      .get('/manifest.json')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(typeof response.body, 'object');
    assert.deepEqual(response.body, manifest);
  });
});

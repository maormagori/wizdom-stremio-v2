const request = require('supertest');
const assert = require('assert');
const nock = require('nock');
const addon = require('../../../server');
const fs = require('fs');

const MOCK_SUB_ID = 66054;
const srtFileBuffer = fs.readFileSync(`${__dirname}/../data/mocksrtfile.srt`);

describe('GET /srt/:id.srt', () => {
  after(() => {
    nock.cleanAll();
  });
  beforeEach(() => {
    nock.cleanAll();
  });

  it('Should download sub zip and extract srt file from it', async () => {
    nock(`https://wizdom.xyz/`)
      .get(`/api/files/sub/${MOCK_SUB_ID}`)
      .replyWithFile(200, `${__dirname}/../data/mockzipfile.zip`, {
        'content-type': 'application/octet-stream',
      });

    const response = await request(addon).get(`/srt/${MOCK_SUB_ID}.srt`);
    assert.strictEqual(response.status, 200);
    assert.strictEqual(
      response.headers['content-type'],
      'application/octet-stream; charset=utf-8'
    );
    assert.strictEqual(response.body.toString(), srtFileBuffer.toString());
  });
  it('Should return 500 if error downloading srt file', async () => {
    nock(`https://wizdom.xyz/`).get(`/api/files/sub/${MOCK_SUB_ID}`).reply(500);

    const response = await request(addon).get(`/srt/${MOCK_SUB_ID}.srt`);
    assert.strictEqual(response.status, 500);
  });
});

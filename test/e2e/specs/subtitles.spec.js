const request = require('supertest');
const assert = require('assert');
const nock = require('nock');
const addon = require('../../../server');

const MOCK_TITLE_ID = `tt1234567`;
const MOCK_SUB_ID1 = 66054;
const MOCK_SUB_NAME1 = 'sub1';
const MOCK_SUB_ID2 = 66055;

const mockTitle = (titleId, season, episode, response, status = 200) => {
  nock(`https://wizdom.xyz/`)
    .get(
      `/api/search?action=by_id&imdb=${titleId}&season=${season}&episode=${episode}`
    )
    .reply(status, response);
};

const createSubtitleArray = (subs) => {
  return subs.map((sub) => ({
    url: `http://127.0.0.1:7001/srt/${sub.id}.srt`,
    lang: 'heb',
    id: `[WIZDOM]${sub.versioname}`,
  }));
};

const makeRequestAndAssertResponse = async (url, expectedSubs) => {
  const response = await request(addon).get(url);
  assert.strictEqual(response.status, 200);
  assert.strictEqual(typeof response.body, 'object');
  assert.strictEqual(Array.isArray(response.body?.subtitles), true);
  assert.deepEqual(response.body?.subtitles, expectedSubs);
};

describe('GET /subtitles/:type/:imdbId/:query?.json', () => {
  after(() => {
    nock.cleanAll();
  });
  beforeEach(() => {
    nock.cleanAll();
  });
  it('should return movie subtitle', async () => {
    const subs = [
      {
        id: MOCK_SUB_ID1,
        versioname: MOCK_SUB_NAME1,
      },
    ];
    mockTitle(MOCK_TITLE_ID, undefined, undefined, subs);
    const expectedSubs = createSubtitleArray(subs);
    const testUrl = `/subtitles/movie/${MOCK_TITLE_ID}/extraArgs.json`;

    await makeRequestAndAssertResponse(testUrl, expectedSubs);
  });

  it('should return episode subtitle', async () => {
    const mockSeason = 2;
    const mockEpisode = 3;
    const subs = [
      {
        id: MOCK_SUB_ID1,
        versioname: MOCK_SUB_NAME1,
      },
    ];
    mockTitle(MOCK_TITLE_ID, mockSeason, mockEpisode, subs);
    const expectedSubs = createSubtitleArray(subs);
    const testUrl = `/subtitles/series/${MOCK_TITLE_ID}:${mockSeason}:${mockEpisode}/extraArgs.json`;

    await makeRequestAndAssertResponse(testUrl, expectedSubs);
  });

  it('should return sorted subtitles', async () => {
    const subs = [
      {
        id: MOCK_SUB_ID1,
        versioname: 'sub1',
      },
      {
        id: MOCK_SUB_ID2,
        versioname: 'sub2',
      },
    ];
    mockTitle(MOCK_TITLE_ID, undefined, undefined, subs);
    const expectedSubs = createSubtitleArray(subs.reverse());
    const testUrl = `/subtitles/movie/${MOCK_TITLE_ID}/filename=sub2.json`;

    await makeRequestAndAssertResponse(testUrl, expectedSubs);
  });

  it('should return empty subtitles for missing title', async () => {
    mockTitle(
      MOCK_TITLE_ID,
      undefined,
      undefined,
      {
        statusCode: 500,
        message: 'Internal Server Error',
      },
      500
    );
    const testUrl = `/subtitles/movie/${MOCK_TITLE_ID}/extraArgs.json`;

    await makeRequestAndAssertResponse(testUrl, []);
  });

  it('should return empty subtitles for missing episode', async () => {
    mockTitle(MOCK_TITLE_ID, undefined, undefined, undefined);
    const testUrl = `/subtitles/series/${MOCK_TITLE_ID}:3:/extraArgs.json`;

    await makeRequestAndAssertResponse(testUrl, []);
  });

  it('should return title subtitles when no extra args were given', async () => {
    const subs = [
      {
        id: MOCK_SUB_ID1,
        versioname: MOCK_SUB_NAME1,
      },
    ];
    mockTitle(MOCK_TITLE_ID, undefined, undefined, subs);
    const expectedSubs = createSubtitleArray(subs);
    const testUrl = `/subtitles/movie/${MOCK_TITLE_ID}.json`;

    await makeRequestAndAssertResponse(testUrl, expectedSubs);
  });
});

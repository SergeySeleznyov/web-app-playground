const request = require('supertest');
const app = require('../../../app');

const searchRequestBody = {
    text: 'search test',
};
const searchRequestBodyString = JSON.stringify(searchRequestBody);

jest.mock('../../../../../shared/src/elastic-search-dal', () => ({
    search: async (args) => {
        return null;
    },
}));

describe('post /api/search', () => {
    it('correct response', (done) => {
        request(app)
            .post('/api/search')
            .send(searchRequestBodyString)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.text).toBe('Error during a searching: Empty elastic search response (null)');
                expect(response.statusCode).toBe(500);

                done();
            });
    });
});

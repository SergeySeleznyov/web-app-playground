const request = require('supertest');
const app = require('../../../app');

const searchRequestBody = {
    text: 'search test',
};
const searchRequestBodyString = JSON.stringify(searchRequestBody);

const searchResponse = [
    {
        '_index': 'blog-index',
        '_id': '123',
        '_score': 0.3974142,
        '_source': {
            'title': 'Post 1',
            'content': '',
        },
        'highlight': {
            'content': [
                'some test <em>search pattern</em> some test',
            ],
        },
    },
    {
        '_index': 'blog-index',
        '_id': '234',
        '_score': 0.39556253,
        '_source': {
            'title': 'Post 2',
            'content': '',
        },
        'highlight': {
            'content': [
                'some test <em>search pattern</em> some test',
            ],
        },
    },
];
const searchResponseString = JSON.stringify(searchResponse);

jest.mock('../../../../../shared/src/elastic-search-dal', () => ({
    search: async (args) => {
        return searchResponse;
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
                expect(response.text).toBe(searchResponseString);
                expect(response.statusCode).toBe(200);

                done();
            });
    });
});

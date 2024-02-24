// const logger = require('../logger');
const request = require('supertest');
const app = require('../../src/app');

const dbContent = [
    {
        id: 'id1',
        title: 'title1',
    }, {
        id: 'id1',
        title: 'title2',
    },
];

jest.mock('../../../shared/src/posts-dal', () => ({
    postsDal: {
        getAll: async () => {
            const promise = new Promise((res, rej) => res(dbContent));
            return await promise;
        },
    },
}));

// beforeAll(() => {
//     logger.silent = true;
// });
// afterAll(() => {
//     logger.silent = false;
// });

describe('get /posts', () => {
    it('correct response', (done) => {
        request(app)
            .get('/api/posts')
            .then((response) => {
                expect(response.text).toBe(JSON.stringify(dbContent));
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

const request = require('supertest');
const app = require('../../../app');

jest.mock('../../../../../shared/src/posts-dal', () => ({
    list: async () => {
        const someDbError = new Error('Some DB error');
        const promise = new Promise((res, rej) => rej(someDbError));
        return await promise;
    },
}));

describe('get /api/posts', () => {
    it('error', (done) => {
        request(app)
            .get('/api/posts')
            .then((response) => {
                expect(response.text).toBe('Error during a list of Posts getting: getPostInfos controller: Some DB error');
                expect(response.statusCode).toBe(500);
                done();
            });
    });
});

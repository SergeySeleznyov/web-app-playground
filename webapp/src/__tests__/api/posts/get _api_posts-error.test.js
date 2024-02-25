const request = require('supertest');
const app = require('../../../app');

jest.mock('../../../../../shared/src/posts-dal', () => ({
    list: async () => {
        const someDbError = new Error('Some DB error');
        const promise = new Promise((res, rej) => rej(someDbError));
        return await promise;
    },
}));

const errorMessageExpected = 'Error during a list of Posts getting: getPostInfos controller: Some DB error';

describe('get /api/posts', () => {
    it('error - Some DB error', (done) => {
        request(app)
            .get('/api/posts')
            .then((response) => {
                expect(response.text).toBe(errorMessageExpected);
                expect(response.statusCode).toBe(500);
                done();
            });
    });
});

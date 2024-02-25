const request = require('supertest');
const app = require('../../../app');

const dbContent = [
    {
        id: 'id1',
        title: 'title1',
    }, {
        id: 'id1',
        title: 'title2',
    },
];

jest.mock('../../../../../shared/src/posts-dal', () => ({
    list: async () => {
        const promise = new Promise((res, rej) => res(dbContent));
        return await promise;
    },
}));


describe('get /api/posts', () => {
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

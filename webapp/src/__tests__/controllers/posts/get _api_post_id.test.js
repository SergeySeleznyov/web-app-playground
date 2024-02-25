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
const Posts = [
    {
        id: 'id1',
        title: 'title1',
        content: 'content1',
    },
];

jest.mock(
    '../../../../../shared/src/posts-dal',
    () => ({
        list: async () => {
            const promise = new Promise((res, rej) => res(dbContent));
            return await promise;
        },
        get: async (id) => {
            if (id === 'id1') {
                return Posts[0];
            }
        },
    }),
);

describe('get /api/post:id', () => {
    it('correct response', (done) => {
        request(app)
            .get('/api/post/id1')
            .then((response) => {
                expect(response.text).toBe(JSON.stringify(Posts[0]));
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});

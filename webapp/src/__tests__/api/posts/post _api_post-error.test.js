const request = require('supertest');
const app = require('../../../app');

const Post3 = {
    id: 'id3',
    title: 'title3',
    content: 'content3',
};
const postRequestBody = JSON.stringify(Post3);

jest.mock('../../../../../shared/src/posts-dal', () => ({
    set: async (args) => {
        throw new Error('some DB error');
    },
}));

const expectedErrorMessage = 'Error during a Post posting: setPost controller: some DB error';

describe('post /api/post', () => {
    it('error - Some DB error', (done) => {
        request(app)
            .post('/api/post')
            .send(postRequestBody)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.text).toBe(expectedErrorMessage);
                expect(response.statusCode).toBe(500);

                done();
            });
    });
});

const request = require('supertest');
const app = require('../../../app');

const Post3 = {
    id: 'id3',
    title: 'title3',
    content: 'content3',
};
const postRequestBody = JSON.stringify(Post3);

const mockPostDalSet = jest.fn();

jest.mock('../../../../../shared/src/posts-dal', () => ({
    set: async (args) => {
        mockPostDalSet(JSON.stringify(args));
    },
}));

describe('post /api/post', () => {
    it('correct response', (done) => {
        request(app)
            .post('/api/post')
            .send(postRequestBody)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.text).toBe('OK');
                expect(response.statusCode).toBe(200);

                expect(mockPostDalSet).toHaveBeenCalledTimes(1);
                expect(mockPostDalSet.mock.calls).toStrictEqual([[postRequestBody]]);

                done();
            });
    });
});

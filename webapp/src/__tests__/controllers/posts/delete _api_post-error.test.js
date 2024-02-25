const request = require('supertest');
const app = require('../../../app');

jest.mock('../../../../../shared/src/posts-dal', () => ({
    del: async (args) => {
        throw new Error('some DB error');
    },
}));

describe('delete /api/post/:id', () => {
    it('error', (done) => {
        request(app)
            .delete('/api/post/id3')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.text).toBe('Error during a Post deleting: some DB error');
                expect(response.statusCode).toBe(500);

                done();
            });
    });
});

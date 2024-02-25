const request = require('supertest');
const app = require('../../../app');

const mockPostDalSet = jest.fn();

jest.mock('../../../../../shared/src/posts-dal', () => ({
    del: async (args) => {
        mockPostDalSet(args);
    },
}));

describe('delete /api/post/:id', () => {
    it('correct response', (done) => {
        request(app)
            .delete('/api/post/id3')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then((response) => {
                expect(response.text).toBe('OK');
                expect(response.statusCode).toBe(200);

                expect(mockPostDalSet).toHaveBeenCalledTimes(1);
                expect(mockPostDalSet.mock.calls).toStrictEqual([['id3']]);

                done();
            });
    });
});

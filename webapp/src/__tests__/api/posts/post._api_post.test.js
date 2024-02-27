const request = require('supertest');
const app = require('../../../app');

const newPost = {
    id: 'id3',
    title: 'title3',
    content: 'content3',
};
const postRequestBody = JSON.stringify(newPost);

const mockPostDalSet = jest.fn();
jest.mock('../../../../../shared/src/posts-dal', () => ({
    set: async (args) => {
        mockPostDalSet(JSON.stringify(args));
    },
}));

const mockQueueSendMessage = jest.fn();
jest.mock('../../../app-rabbitmq', () => ({
    sendMessage: async (args) => {
        mockQueueSendMessage(JSON.stringify(args));
    },
}));

const rabbitmqCommand = '"{\\"postId\\":\\"id3\\",\\"command\\":\\"INDEX\\"}"';

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

                expect(mockQueueSendMessage).toHaveBeenCalledTimes(1);
                expect(mockQueueSendMessage.mock.calls).toStrictEqual([[rabbitmqCommand]]);

                done();
            });
    });
});

import {
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import App from '../App';

const getApiPostsResponse = [
    {
        id: 'id1',
        title: 'title1',
    }, {
        id: 'id2',
        title: 'title2',
    },
];

describe('Blog post list View', () => {
    it('Fetched blogposts are in render', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(getApiPostsResponse),
                status: 200,
            }),
        );
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<App />);
        await waitFor(() => expect(screen.getByText(/title1/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/title2/i)).toBeInTheDocument());
    });
});

import {
    fireEvent,
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

const getApiPostResponse = [
    {
        id: 'id1',
        title: 'title1',
        content: 'content1',
    },
];

describe('Blog post View', () => {
    it('Blogpost appears by its item click and its content renders', async () => {
        jest.spyOn(global, 'fetch').mockImplementation((url) => {
            console.log(url);
            switch (url) {
                case '/posts':
                    return Promise.resolve({
                        json: () => Promise.resolve(getApiPostsResponse),
                        status: 200,
                    });
                case '/post/id1':
                    return Promise.resolve({
                        json: () => Promise.resolve(getApiPostResponse),
                        status: 200,
                    });
            }
        });
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<App />);
        await waitFor(() => expect(screen.getByText(/title1/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/title2/i)).toBeInTheDocument());

        const postListItemTextElement = screen
            .getAllByTestId('post-list__item_main-part')
            .find((el) => el.textContent === 'title1');

        expect(postListItemTextElement).toBeInTheDocument();
        fireEvent.click(postListItemTextElement);

        await waitFor(() => expect(screen.getByText(/Blog post #id1/i)).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText(/content1/i)).toBeInTheDocument());
    });
});

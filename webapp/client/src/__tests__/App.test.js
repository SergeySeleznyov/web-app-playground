import {
    render,
    screen,
} from '@testing-library/react';
import App from '../App';

describe('App render', () => {
    it('loading element', () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                // json: () => Promise.resolve([]),
                json: () => new Promise((res, rej) => window.setTimeout(() => {
                    rej(new Error('Postponed request has failted by timeout after test has already passed'));
                }, 3000)),
                status: 200,
            }),
        );

        // eslint-disable-next-line react/react-in-jsx-scope
        render(<App />);
        const loadingElement = screen.getByText(/Loading.../i);
        expect(loadingElement).toBeInTheDocument();
    });
});

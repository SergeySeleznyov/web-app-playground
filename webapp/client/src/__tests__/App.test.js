import {render, screen} from '@testing-library/react';
import App from '../App';

describe('App render', () => {
    it('loading element', () => {
        // eslint-disable-next-line react/react-in-jsx-scope
        render(<App />);
        const loadingElement = screen.getByText(/Loading.../i);
        expect(loadingElement).toBeInTheDocument();
    });
});

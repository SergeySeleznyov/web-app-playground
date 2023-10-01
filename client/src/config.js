const isTest = process.env.NODE_ENV === 'test';

const api_url = isTest ? '' : process.env.REACT_APP_API_URL;

export {
    api_url,
};

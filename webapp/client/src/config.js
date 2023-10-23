const isTest = process.env.NODE_ENV === 'test';

const apiUrl = isTest ? '' : process.env.REACT_APP_API_URL;

export {
    apiUrl,
};

const isTest = process.env.NODE_ENV === 'test';

const apiUrl = isTest ? '' : process.env.REACT_APP_API_URL;

const loadingAdditionalDelay = isTest ? 0 : 1000;

export {
    apiUrl,
    loadingAdditionalDelay,
};

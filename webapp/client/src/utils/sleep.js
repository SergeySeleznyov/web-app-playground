// @ts-check

/**
 * Sleeps for some timeout.
 * @param {number} ms - The delay in milliseconds.
 */
const sleep = async (ms) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
};

export default sleep;

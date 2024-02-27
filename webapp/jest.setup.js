jest
    .spyOn(global, 'fetch')
    .mockImplementation((url) => {
        const errorMessage = `Unexpected network usage from the test environment (${url})`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    });

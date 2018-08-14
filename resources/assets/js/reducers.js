export const reducers = [
].reduce(
    (reducerObject, reducerName) => (
        {...reducerObject, [reducerName]: require(`./reducers/${reducerName}`)}
    ),
    {}
);

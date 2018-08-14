export const sagas = [
].map(name => require(`./sagas/${name}`).root);

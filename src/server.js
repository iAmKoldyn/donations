const fastify = require('fastify')({ logger: true });
const autoload = require('@fastify/autoload');
const path = require('path');

const {
    DB_USER: user,
    DB_PASSWORD: password,
    DB_HOST: host = 'localhost',
    DB_PORT: port,
    DATABASE: db
} = process.env;

fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`
});


fastify.register(autoload, {
    dir: path.join(__dirname, 'routers'),
    dirNameRoutePrefix: false,
});

const start = async () => {
    try {
        await fastify.listen(3001);
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

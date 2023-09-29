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

const mongoose = require('mongoose');

fastify.register(autoload, {
    dir: path.join(__dirname, 'routers'),
    dirNameRoutePrefix: false,
});

fastify.post('/test', async (request, reply) => {
    const { a } = request.query;
    return request.body;
});

const start = async () => {
    try {
        await mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`);
        await fastify.listen(3001, '0.0.0.0');
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

const fastify = require('fastify')({ logger: true });
const autoload = require('@fastify/autoload');
const path = require('path');
const fastifyMongo = require('fastify-mongodb');

fastify.register(fastifyMongo, {
    url: process.env.MONGODB_URI,
});

fastify.register(autoload, {
    dir: path.join(__dirname, 'routers'),
    dirNameRoutePrefix: false,
});

// ... rest of the file



const start = async () => {
    try {
        await fastify.listen(3001, '0.0.0.0');
        fastify.log.info(`server listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();

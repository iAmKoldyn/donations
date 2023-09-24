const fastify = require('fastify')({ logger: true });
const autoload = require('@fastify/autoload')
const path = require('path');

fastify.register(autoload, {
    dir: path.join(__dirname, 'routers'),
    dirNameRoutePrefix: false
})


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

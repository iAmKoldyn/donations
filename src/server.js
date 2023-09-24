const fastify = require('fastify')({ logger: true });
const authorRouter = require('./routers/authorRouter');
const subscriberRouter = require('./routers/subscriberRouter');

fastify.register(authorRouter);
fastify.register(subscriberRouter);

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

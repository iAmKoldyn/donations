const { subscriberResponse } = require('../stubs');

async function routes(fastify, options) {
    fastify.get('/subscribers', async (request, reply) => {
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(subscriberResponse);
    });
}

module.exports = routes;

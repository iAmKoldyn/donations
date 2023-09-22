const { authorResponse } = require('../stubs');

async function routes(fastify, options) {
    fastify.get('/authors', async (request, reply) => {
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(authorResponse);
    });
}

module.exports = routes;
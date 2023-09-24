const { authorSuccessResponse, authorFailureResponse } = require('../stubs');

async function routes(fastify, options) {
    fastify.get('/authors', async (request, reply) => {
        const shouldFail = request.query.fail === 'true';

        if (shouldFail) {
            return reply
                .code(400)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(authorFailureResponse);
        } else {
            return reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(authorSuccessResponse);
        }
    });
}

module.exports = routes;

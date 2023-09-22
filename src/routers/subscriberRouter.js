const { subscriberSuccessResponse, subscriberFailureResponse} = require('../stubs');

async function routes(fastify, options) {
    fastify.get('/subscribers', async (request, reply) => {
        const shouldFail = request.query.fail === 'true';

        if (shouldFail) {
            return reply
                .code(400)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(subscriberFailureResponse);
        } else {
            return reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(subscriberSuccessResponse);
        }
    });
}

module.exports = routes;

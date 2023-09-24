async function routes(fastify, options) {
    fastify.get('/donation:id', async (request, reply) => {
        //* TODO - retrieve donation by id, return 200 or 404

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*serialized donation*");
    });

    fastify.get('/donations', async (request, reply) => {
        //* TODO - retrieve donations collection by authorId, don't wrap in try-catch or wrap with not 500 code in catch
        //* TODO - if param authorId is not present, return 422

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*donations collection*");
    });

    fastify.post('/donations', async (request, reply) => {
        //* TODO - check request parameters, check user is subscriber, create donation, return 200, 422

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("donation with id: *id* created!")
    });
}

module.exports = routes;

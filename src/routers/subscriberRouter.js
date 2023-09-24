async function routes(fastify, options) {
    fastify.get('/subscriber:id', async (request, reply) => {
        //* TODO - retrieve subscriber by id, return 200 or 404

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*authors collection*");
    });

    fastify.get('/subscribers', async (request, reply) => {
        //* TODO - retrieve subscribers collection, don't wrap in try-catch or wrap with not 500 code in catch
        //* TODO - if authorId param is present, get subscribers collection by authorId

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*subscribers collection*");
    });

    fastify.post('/subscribers', async (request, reply) => {
        //* TODO - check request parameters, create subscriber, return 200, 422 or 409

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("subscriber with id: *id* created!")
    });

    fastify.delete('/subscriber:id', async (request, reply) => {
        //* TODO - find and delete subscriber by id, return 200 or 404

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("subscriber with id: *id* deleted!")
    });

    fastify.put('/subscriber:id', async (request, reply) => {
        //* TODO - find and update subscriber by id, return 200, 404 or 422 if params are incorrect

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({message: "subscriber with id: *id* updated!",
                "subscriber": "*serialized subscriber*"})
    });
}

module.exports = routes;

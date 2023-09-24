async function routes(fastify, options) {
    fastify.get('/subscribers/:id', async (request, reply) => {
        //* TODO - retrieve subscriber by id, return 200 or 404

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(`*serialized subscriber with id: ${id}*`);
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

    fastify.delete('/subscribers/:id', async (request, reply) => {
        //* TODO - find and delete subscriber by id, return 200 or 404

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("subscriber with id: *id* deleted!")
    });

    fastify.put('/subscribers/:id', async (request, reply) => {
        //* TODO - find and update subscriber by id, return 200, 404 or 422 if params are incorrect

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({message: `subscriber with id: ${id} updated!`,
                "subscriber": "*serialized subscriber*"})
    });
}

module.exports = routes;

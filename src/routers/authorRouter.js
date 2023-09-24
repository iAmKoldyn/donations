async function routes(fastify, options) {
    fastify.get('/author:id', async (request, reply) => {
        //* TODO - retrieve author by id, return 200 or 404

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*serialized author*");
    });

    fastify.get('/authors', async (request, reply) => {
        //* TODO - retrieve authors collection, don't wrap in try-catch or wrap with not 500 code in catch
        //* TODO - if param tags is present, return authors collection by tags

            return reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send("*authors collection*");
    });

    fastify.post('/authors', async (request, reply) => {
        //* TODO - check request parameters, create author, return 200, 422 or 409

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("author with id: *id* created!")
    });

    fastify.delete('/author:id', async (request, reply) => {
        //* TODO - find and delete author by id, return 200 or 404

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("author with id: *id* deleted!")
    });

    fastify.put('/authors:id', async (request, reply) => {
        //* TODO - find and update author by id, return 200, 404 or 422 if params are incorrect

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({message: "author with id: *id* updated!",
                    "author": "*serialized author*"})
    });
}

module.exports = routes;

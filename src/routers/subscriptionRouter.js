async function routes(fastify, options) {
    fastify.get('/subscription/:id', async (request, reply) => {
        //* TODO - retrieve subscription by id, return 200 or 404

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(`*serialized subscription with id: ${id}*`);
    });

    fastify.get('/subscriptions', async (request, reply) => {
        //* TODO - retrieve subscriptions collection, don't wrap in try-catch or wrap with not 500 code in catch
        //* TODO - if authorId param is present, get subscribers collection by authorId
        //* TODO - if subscriberId param is present, get subscribers collection by subscriberId

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*subscriptions collection*");
    });

    fastify.post('/subscription', async (request, reply) => {
        //* TODO - check request parameters, create subscription, return 200, 422
        //* TODO - 409 if there is subscription with same level, userId and authorId and it's actual

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("subscription with id: *id* created!")
    });
}

module.exports = routes;

async function routes(fastify, options) {
    fastify.get('/comments/:id', async (request, reply) => {
        //* TODO - retrieve comment by id, return 200 or 404

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(`*serialized comment with id: ${id}*`);
    });

    fastify.get('/comments', async (request, reply) => {
        //* TODO - retrieve comments collection by postId or subscriberId, don't wrap in try-catch or wrap with not 500 code in catch
        //* TODO - if params postId and subscriberId are not present, return 422

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*comments collection*");
    });

    fastify.post('/comments', async (request, reply) => {
        //* TODO - check request parameters, current user is subscriber, create comment, return 200, 422

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("comment with id: *id* created!")
    });

    fastify.delete('/comments/:id', async (request, reply) => {
        //* TODO - find and delete comment by id if current user is post author or comment author return 200 or 404

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(`comment with id: ${id} deleted!`)
    });
}

module.exports = routes;

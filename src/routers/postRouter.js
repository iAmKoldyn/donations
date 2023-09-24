async function routes(fastify, options) {
    fastify.get('/post/:id', async (request, reply) => {
        //* TODO - retrieve post by id, return 200 or 404

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(`*serialized post with id: ${id}*`);
    })

    fastify.get('/posts', async (request, reply) => {
        //* TODO - retrieve posts collection by authorId or by subscriberId, don't wrap in try-catch or wrap with not 500 code in catch
        //* TODO - retrieve posts by level order by date descending if subscriberId is present (from collection service)
        //* TODO - retrieve posts by author if authorId is present and == current user order by date descending
        //* TODO - retrieve posts by author and level if authorId is present and != current user order by date descending
        //* TODO - if params authorId and subscriberId are not present, return 422

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("*posts collection*");
    });

    fastify.post('/posts', async (request, reply) => {
        //* TODO - check request parameters, current user is author, create post, return 200, 422

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send("post with id: *id* created!")
    });

    fastify.delete('/posts/:id', async (request, reply) => {
        //* TODO - find and delete pst by id if current user is author return 200 or 404

        const { id } = request.params;

        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(`post with id: ${id} deleted!`)
    });
}

module.exports = routes;

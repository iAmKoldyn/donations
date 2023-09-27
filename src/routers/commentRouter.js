const Comment = require('../models/Comment');

async function routes(fastify, options) {
    fastify.get('/comments/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const comment = await Comment.findById(id).exec();
            if (!comment) return reply.code(404).send('Comment not found');
            return reply.code(200).send(comment);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/comments', async (request, reply) => {
        const { postId, subscriberId } = request.query;
        if (!postId && !subscriberId) return reply.code(422).send('postId or subscriberId is required');

        try {
            let comments;
            if (postId) {
                comments = await Comment.find({ postId }).exec();
            } else {
                comments = await Comment.find({ subscriberId }).exec();
            }
            return reply.code(200).send(comments);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });


    fastify.post('/comments', async (request, reply) => {
        const { postId, userId, content, date } = request.body;
        if (!postId || !userId || !content) return reply.code(422).send('PostId, UserId, and Content are required');

        try {
            const comment = new Comment({ postId, userId, content, date });
            await comment.save();
            return reply.code(200).send(comment);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.delete('/comments/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const comment = await Comment.findByIdAndDelete(id).exec();
            if (!comment) return reply.code(404).send('Comment not found');
            return reply.code(200).send(`Comment with id: ${id} deleted!`);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

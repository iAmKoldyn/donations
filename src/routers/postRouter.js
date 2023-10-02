const Post = require('../models/post');
const Subscription = require('../models/subscription');
const mongoose = require('mongoose');

async function routes(fastify, options) {
    fastify.get('/posts/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const post = await Post.findById(id).exec();
            if (!post) return reply.code(404).send('Post not found');
            return reply.code(200).send(post);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/posts', async (request, reply) => {
        const { authorId, subscriberId } = request.query;
        if (!authorId && !subscriberId) return reply.code(422).send('authorId or subscriberId is required');

        try {
            let posts;
            if (authorId) {
                posts = await Post.find({ authorId }).sort({ date: -1 }).exec();
            } else if (subscriberId) {
                const subscriptions = await Subscription.find({ userId: subscriberId }).exec();
                const authorIds = subscriptions.map(sub => sub.authorId);
                posts = await Post.find({ authorId: { $in: authorIds } }).sort({ date: -1 }).exec();
            } else {
                posts = await Post.find().sort({ date: -1 }).exec();
            }
            return reply.code(200).send(posts);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.post('/posts', async (request, reply) => {
        const { userId, authorId, content, attachment, visibilityLevel, viewsCount, date } = request.body;
        if (!userId || !authorId || !content || !visibilityLevel) return reply.code(422).send('UserId, AuthorId, Content, and VisibilityLevel are required');

        try {
            const post = new Post({ userId, authorId, content, attachment, visibilityLevel, viewsCount, date });
            await post.save();
            return reply.code(200).send(post);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.delete('/posts/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const post = await Post.findByIdAndDelete(id).exec();
            if (!post) return reply.code(404).send('Post not found');
            return reply.code(200).send(`Post with id: ${id} deleted!`);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

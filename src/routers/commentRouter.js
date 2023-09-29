const Comment = require('../models/Comment');

async function routes(fastify, options) {
    fastify.get('/comments/:id', async (request, reply) => {
        const {id} = request.params;
        try {
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('comments');


            const comment = await collection.findOne({_id: new fastify.mongo.ObjectId(id)});
            if (!comment) return reply.code(404).send('Comment not found');
            return reply.code(200).send(comment);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/comments', async (request, reply) => {
        const {postId, subscriberId} = request.query;

        const db = fastify.mongo.client.db('mongodb');
        const collection = db.collection('comments');

        try {
            if (postId && subscriberId) {
                comments = await collection.find({
                    postId: new fastify.mongo.ObjectId(postId),
                    userId: new fastify.mongo.ObjectId(subscriberId)
                });
            } else if (postId) {
                comments = await collection.find({postId: new fastify.mongo.ObjectId(postId)});
            } else if (subscriberId) {
                comments = await collection.find({userId: new fastify.mongo.ObjectId(subscriberId)});
            } else {
                return reply.code(422).send('postId or subscriberId is required');
            }
            return reply.code(200).send(comments);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });


    fastify.post('/comments', async (request, reply) => {
        const {postId, userId, content} = request.body;
        if (!postId || !userId || !content) return reply.code(422).send('PostId, UserId, and Content are required');

        try {
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('comments');

            const existingPost = collection.findOne({
                postId: fastify.mongo.ObjectId(postId),
                userId: fastify.mongo.ObjectId(userId)
            })

            let result;

            const timeout = (Date.now() - new Date(existingPost.date)) / 1000 < 60;

            if (existingPost) {
                if (timeout) {
                    return reply.code(403).send(`Your post have not been saved because of the timeout. Please wait ${60 - (Date.now() - new Date(existingPost.date)) / 1000} seconds`);
                } else {
                    result = await collection.insertOne({
                        postId: postId,
                        userId: userId,
                        content: content,
                        date: new Date(Date.now()).toISOString()});
                }
            }

            if (!result.ops || result.ops.length === 0) {

                const insertedPost = await collection.findOne({ _id: result.id});
                if (insertedPost) return reply.code(200).send(insertedPost);
                return reply.code(500).send('Insertion successful, but no document returned.');
            }
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.delete('/comments/:id', async (request, reply) => {
        const {id} = request.params;
        try {
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('comments');

            const result = await collection.deleteOne({ _id: new fastify.mongo.ObjectId(id) });
            if (result.deletedCount === 0) return reply.code(404).send('Comment not found');

            return reply.code(200).send(`Comment with id: ${id} deleted!`);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

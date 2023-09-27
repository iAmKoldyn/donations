const Author = require('../models/Author');

async function routes(fastify, options) {
    fastify.get('/authors/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const author = await Author.findById(id).exec();
            if (!author) return reply.code(404).send('Author not found');
            return reply.code(200).send(author);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/authors', async (request, reply) => {
        try {
            const { tags } = request.query;
            let authors;
            if (tags) {
                authors = await Author.find({ tags: { $in: tags.split(',') } }).exec();
            } else {
                authors = await Author.find().exec();
            }
            return reply.code(200).send(authors);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.post('/authors', async (request, reply) => {
        const { name, hashPassword, subscriptionLevels } = request.body;
        if (!name || !hashPassword) return reply.code(422).send('Name and password are required');

        try {
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('authors');

            const existingAuthor = await collection.findOne({ name });
            if (existingAuthor) return reply.code(409).send('Author already exists');

            const result = await collection.insertOne({ name, hashPassword, subscriptionLevels });
            return reply.code(200).send(result.ops[0]);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.delete('/authors/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const author = await Author.findByIdAndDelete(id).exec();
            if (!author) return reply.code(404).send('Author not found');
            return reply.code(200).send(`Author with id: ${id} deleted!`);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.put('/authors/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const author = await Author.findByIdAndUpdate(id, request.body, { new: true }).exec();
            if (!author) return reply.code(404).send('Author not found');
            return reply.code(200).send(author);
        } catch (error) {
            if (error.name === 'ValidationError') return reply.code(422).send(error);
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

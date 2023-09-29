const Author = require('../models/Author');

async function routes(fastify, options) {
    fastify.get('/authors/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('authors');

            const author = await collection.findOne({ _id: new fastify.mongo.ObjectId(id) });
            if (!author) return reply.code(404).send('Author not found');

            return reply.code(200).send(author);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/authors', async (request, reply) => {
        try {
            const { tags } = request.query;
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('authors');

            let authors;
            if (tags) {
                authors = await collection.find({ tags: { $in: tags.split(',') } }).toArray();
            } else {
                authors = await collection.find().toArray();
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
            const db = fastify.mongo.client.db('mongodb'); //required for each model!!!!!!!!!!!!!!
            const collection = db.collection('authors');

            const existingAuthor = await collection.findOne({ name });
            if (existingAuthor) return reply.code(409).send('Author already exists');

            const result = await collection.insertOne({ name, hashPassword, subscriptionLevels });

            // Log res debug
            console.log('Insert Result:', JSON.stringify(result, null, 2));

            if (!result.ops || result.ops.length === 0) {

                const insertedAuthor = await collection.findOne({ name });
                if (insertedAuthor) return reply.code(200).send(insertedAuthor);
                return reply.code(500).send('Insertion successful, but no document returned.');
            }

            return reply.code(200).send(result.ops[0]);
        } catch (error) {
            console.error('Error during insert:', error);
            return reply.code(500).send(error);
        }
    });

    fastify.delete('/authors/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('authors');

            const result = await collection.deleteOne({ _id: new fastify.mongo.ObjectId(id) });
            if (result.deletedCount === 0) return reply.code(404).send('Author not found');

            return reply.code(200).send(`Author with id: ${id} deleted!`);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.put('/authors/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const db = fastify.mongo.client.db('mongodb');
            const collection = db.collection('authors');

            const updateResult = await collection.updateOne(
                { _id: new fastify.mongo.ObjectId(id) },
                { $set: request.body }
            );

            if (updateResult.matchedCount === 0) return reply.code(404).send('Author not found');

            const updatedAuthor = await collection.findOne({ _id: new fastify.mongo.ObjectId(id) });
            if (!updatedAuthor) return reply.code(404).send('Updated author not found');

            return reply.code(200).send(updatedAuthor);
        } catch (error) {
            if (error.name === 'ValidationError') return reply.code(422).send(error);
            return reply.code(500).send(error);
        }
    });

}

module.exports = routes;

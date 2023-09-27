const Donation = require('../models/Donation');

async function routes(fastify, options) {
    fastify.get('/donations/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const donation = await Donation.findById(id).exec();
            if (!donation) return reply.code(404).send('Donation not found');
            return reply.code(200).send(donation);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/donations', async (request, reply) => {
        const { authorId } = request.query;
        if (!authorId) return reply.code(422).send('authorId is required');

        try {
            const donations = await Donation.find({ authorId }).exec();
            return reply.code(200).send(donations);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });


    fastify.post('/donations', async (request, reply) => {
        const { sum, comment, userId, authorId, date } = request.body;
        if (!sum || !userId || !authorId) return reply.code(422).send('Sum, UserId, and AuthorId are required');

        try {
            const donation = new Donation({ sum, comment, userId, authorId, date });
            await donation.save();
            return reply.code(200).send(donation);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

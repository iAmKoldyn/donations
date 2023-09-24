const Subscription = require('../models/Subscription');

async function routes(fastify, options) {
    fastify.get('/subscriptions/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const subscription = await Subscription.findById(id).exec();
            if (!subscription) return reply.code(404).send('Subscription not found');
            return reply.code(200).send(subscription);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/subscriptions', async (request, reply) => {
        const { authorId, subscriberId } = request.query;
        try {
            let subscriptions;
            if (authorId) {
                subscriptions = await Subscription.find({ authorId }).exec();
            } else if (subscriberId) {
                subscriptions = await Subscription.find({ userId: subscriberId }).exec();
            } else {
                subscriptions = await Subscription.find().exec();
            }
            return reply.code(200).send(subscriptions);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });


    fastify.post('/subscriptions', async (request, reply) => {
        const { userId, isPaid, expirationDate, authorId, level, autoRefresh } = request.body;
        if (!userId || !authorId || !level) return reply.code(422).send('UserId, AuthorId, and Level are required');

        try {
            const existingSubscription = await Subscription.findOne({ userId, authorId, level, expirationDate: { $gte: new Date() } }).exec();
            if (existingSubscription) return reply.code(409).send('Active subscription already exists');

            const subscription = new Subscription({ userId, isPaid, expirationDate, authorId, level, autoRefresh });
            await subscription.save();
            return reply.code(200).send(subscription);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

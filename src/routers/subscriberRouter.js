const User = require('../models/user');
const Subscription = require('../models/subscription');

async function routes(fastify, options) {
    fastify.get('/subscribers/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const user = await User.findById(id).exec();
            if (!user) return reply.code(404).send('Subscriber not found');

            const subscriptions = await Subscription.find({ userId: id }).exec();
            return reply.code(200).send({ user, subscriptions });
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/subscribers', async (request, reply) => {
        const { authorId } = request.query;
        try {
            let subscribers;
            if (authorId) {
                const subscriptions = await Subscription.find({ authorId }).exec();
                subscribers = await User.find({ _id: { $in: subscriptions.map(sub => sub.userId) } }).exec();
            } else {
                subscribers = await User.find().exec();
            }
            return reply.code(200).send(subscribers);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });



    fastify.post('/subscribers', async (request, reply) => {
        const { name, hashPassword } = request.body;
        if (!name || !hashPassword) return reply.code(422).send('Name and password are required');

        try {
            const user = new User({ name, hashPassword });
            await user.save();
            return reply.code(200).send(user);
        } catch (error) {
            if (error.code === 11000) return reply.code(409).send('Subscriber already exists');
            return reply.code(500).send(error);
        }
    });

    fastify.delete('/subscribers/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const user = await User.findByIdAndDelete(id).exec();
            if (!user) return reply.code(404).send('Subscriber not found');
            return reply.code(200).send(`Subscriber with id: ${id} deleted!`);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.put('/subscribers/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const user = await User.findByIdAndUpdate(id, request.body, { new: true }).exec();
            if (!user) return reply.code(404).send('Subscriber not found');
            return reply.code(200).send(user);
        } catch (error) {
            if (error.name === 'ValidationError') return reply.code(422).send(error);
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

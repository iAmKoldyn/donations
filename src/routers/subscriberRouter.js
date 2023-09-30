const User = require('../models/user');
const Subscription = require('../models/subscription');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

async function routes(fastify, options) {
    fastify.get('/subscribers/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const user = await User.findOne({ _externalId: id }).exec();
            if (!user) return reply.code(404).send('Subscriber not found');

            const subscriptions = await Subscription.find({ userId: user._id }).exec();
            return reply.code(200).send({ user: user.serialized(), subscriptions });
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/subscribers', async (request, reply) => {
        const { authorId } = request.query;
        try {
            if (!authorId) {
                return reply.code(400).send({ error: 'authorId is required' });
            }

            const subscriptions = await Subscription.find({ authorId }).exec();
            const subscribers = await User.find({ _id: { $in: subscriptions.map(sub => sub.userId) } }).exec();

            return reply.code(200).send(subscribers.map(user => user.serialized()));
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.post('/subscribers', async (request, reply) => {
        const { name, password } = request.body;
        if (!name || !password) return reply.code(422).send('Name and password are required');

        try {
            const existingUser = await User.findOne({ name });
            if (existingUser) return reply.code(409).send('Subscriber already exists');

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                hashPassword: hashedPassword
            });
            await user.save();
            return reply.code(200).send(user.serialized());
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.delete('/subscribers/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const user = await User.findOneAndDelete({ _externalId: id }).exec();
            if (!user) return reply.code(404).send('Subscriber not found');
            return reply.code(200).send(`Subscriber with id: ${id} deleted!`);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.put('/subscribers/:id', async (request, reply) => {
        const { id } = request.params;
        try {
            const user = await User.findOneAndUpdate({ _externalId: id }, request.body, { new: true }).exec();
            if (!user) return reply.code(404).send('Subscriber not found');
            return reply.code(200).send(user.serialized());
        } catch (error) {
            if (error.name === 'ValidationError') return reply.code(422).send(error);
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;
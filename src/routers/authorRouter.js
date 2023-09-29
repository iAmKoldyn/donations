const Author = require('../models/author');
const {Schema} = require("mongoose");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const salt = bcrypt.genSaltSync(5);

async function routes(fastify, options) {
    fastify.get('/authors/:id', async (request, reply) => {
        const {id} = request.params;
        try {
            const author = await Author.findOne({_externalId: id});
            if (!author) return reply.code(404).send({error: `author with id: ${id} not found`});

            return reply.code(200).send(author.serialized());
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/authors', async (request, reply) => {
        try {
            const {tags} = request.query;

            let authors;

            if (tags) {
                authors = await Author.find({tags: {$in: tags.split(',')}});
            } else {
                authors = await Author.find();
            }

            let serialized_authors = authors.map((author) => author.serialized());

            return reply.code(200).send({data: serialized_authors});
        } catch (error) {
            return reply.code(500).send(error);
        }
    });


    fastify.post('/authors', async (request, reply) => {
        const {name, password, subscriptionLevels} = request.body;
        if (!name || !password) {
            if (!name && !password) {
                return reply.code(422).send({error: 'name and password are required'});
            } else if (!name) {
                return reply.code(422).send({error: 'name is required'});
            } else {
                return reply.code(422).send({error: 'password is required'});
            }
        }

        try {
            const existingAuthor = await Author.findOne({name});
            if (existingAuthor) return reply.code(409).send({error: `author with name: ${name} already exists`});

            const author = await Author.create({
                _externalId: new mongoose.Types.ObjectId(),
                name: name,
                hashPassword: bcrypt.hashSync(password, salt),
                subscriptionLevels: subscriptionLevels
            });

            console.log('Insert Result:', JSON.stringify(author, null, 2));

            if (author) return reply.code(200).send({
                status: 'created',
                id: author.serialized().id
            });

            return reply.code(500).send({error: 'insertion successful, but no document returned'});
        } catch (error) {
            console.error('Error during insert:', error);
            return reply.code(500).send({error: error});
        }
    });

    fastify.delete('/authors/:id', async (request, reply) => {
        const {id} = request.params;
        try {
            const result = await Author.deleteOne({_externalId: id});
            if (result.deletedCount === 0) return reply.code(404).send({error: `author with id: ${id} not found`});

            return reply.code(200).send({success: `author with id: ${id} deleted!`});
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.put('/authors/:id', async (request, reply) => {
        if (Author.requiredParams() !== request.body.keys) {
            const diff = Author.requiredParams().filter((element) => !request.body[element]);
            return reply.code(422).send({error: `required fields: ${diff.join(", ")}`});
        }

        const {id} = request.body;

        try {
            const updatedAuthor = await Author.findOneAndUpdate(
                {_externalId: id},
                {$set: request.body}
            );

            if (!updatedAuthor) return reply.code(404).send({error: `author with id: ${id} not found`});

            return reply.code(200).send({data: updatedAuthor.serialized()});
        } catch (error) {
            return reply.code(500).send({error: error});
        }
    });

}

module.exports = routes;

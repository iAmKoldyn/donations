const Comment = require('../models/comment');
const {getCommentsByPostId, getCommentsByUserId} = require("../services/commentCollectionService");
const Author = require("../models/author");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

async function routes(fastify, options) {
    fastify.get('/comments/:id', async (request, reply) => {
        const {id} = request.params;
        try {
            const comment = await Comment.findOne({external_id: id});

            if (!comment) return reply.code(404).send('Comment not found');
            return reply.code(200).send(comment);
        } catch (error) {
            return reply.code(500).send(error);
        }
    });

    fastify.get('/comments', async (request, reply) => {
        const {postId, subscriberId} = request.query;

        let comments;

        if (postId && subscriberId) {
            comments = await getCommentsByPostId(postId, getCommentsByUserId(subscriberId));
        } else if (postId) {
            comments = await getCommentsByPostId(postId);
        } else if (subscriberId) {
            comments = await getCommentsByUserId(subscriberId);
        } else {
            return reply.code(422).send({error: 'postId or subscriberId is required'});
        }

        try {
            return reply.code(200).send({data: comments});
        } catch (error) {
            return reply.code(500).send({error: error});
        }
    });


    fastify.post('/comments', async (request, reply) => {
        const {postId, userId, content} = request.body;
        if (!postId || !userId || !content) {
            const diff = [];
            if (!postId) {
                diff.push('postId');
            }
            if (!userId) {
                diff.push('userId');
            }
            if (!content) {
                diff.push('content');
            }
            return reply.code(422).send({error: `required params: ${diff.join(", ")}`});
        }

        try {
            const existingAuthor = await Comment.findOne({name});
            if (existingAuthor) return reply.code(409).send({error: `author with name: ${name} already exists`});

            const comment = await Comment.create({
                _externalId: new mongoose.Types.ObjectId(),
                postId: postId,
                userId: userId,
                content: content,
                date: new Date(Date.now()).toISOString()
            });

            console.log('Insert Result:', JSON.stringify(author, null, 2));

            if (comment) return reply.code(200).send({
                status: 'created',
                id: comment.serialized().id
            });
            return reply.code(500).send({error: 'insertion successful, but no document returned'});

        } catch (error) {
            console.error('Error during insert:', error);
            return reply.code(500).send({error: error});
        }
    });

    fastify.delete('/comments/:id', async (request, reply) => {
        const {id} = request.params;
        try {
            const result = await Comment.deleteOne({_externalId: id});
            if (result.deletedCount === 0) return reply.code(404).send({error: `author with id: ${id} not found`});

            return reply.code(200).send({success: `comment with id: ${id} deleted!`});
        } catch (error) {
            return reply.code(500).send(error);
        }
    });
}

module.exports = routes;

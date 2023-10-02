const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

async function getCommentsByPostId(postId, query = null) {
    let comments;
    const serializedComments = [];

    if (query) {
        comments = await query.find({postId: postId}).select('-postId').exec();
    } else {
        comments = await Comment.find({postId: postId}).select('-postId').exec();
    }

    for (const doc of comments) {
        let comm = doc.serialized();
        await addSerializedUser(comm);
        serializedComments.push(comm);
    }

    return serializedComments;
}

async function getCommentsByUserId(userId, query = null) {
    let comments;
    const serializedComments = [];

    if (query) {
        comments = await query.find({userId: userId}).select('-userId').exec();
    } else {
        comments = await Comment.find({userId: userId}).select('-userId').exec();
    }

    for (const comment of comments) {
        await addSerializedPost(comment);
        serializedComments.push(comment);
    }

    return serializedComments;
}

async function addSerializedPost(comment) {
    const {postId} = comment;
    const post = await Post.findById(postId).exec();
    delete comment["postId"];
    comment["post"] = post ? post.serialized() : null;
}

async function addSerializedUser(comment) {
    const {userId} = comment;
    const user = await User.findById(userId).exec();
    delete comment["userId"];
    comment["author"] = user ? user.serialized() : null;
}

module.exports = {getCommentsByUserId, getCommentsByPostId};

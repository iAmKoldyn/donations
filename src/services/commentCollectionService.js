const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

async function getCommentsByPostId(postId, query = null) {
    let comments;
    const serializedComments = [];

    if (query) {
        comments = query.find({postId: postId}).select('-postId');
    } else {
        comments = Comment.find({postId: postId}).select('-postId');
    }

    for await (const doc of comments) {
        let comm = doc.serialized();
        addSerializedUser(comm);
        serializedComments.push(comm);
    }

    return serializedComments;
}

async function getCommentsByUserId(userId, query = null) {
    let comments;
    const serializedComments = [];

    if (query) {
        comments = query.find({postId: userId}).select('-userId');
    } else {
        comments = Comment.find({postId: userId}).select('-userId');
    }

    comments.forEach((comment) => {
        addSerializedPost(comment);
        serializedComments.push(comment)
    });

    return serializedComments;
}

function addSerializedPost(comment) {
    const {postId} = comment;

    const post = Post.find({_id: postId});

    delete comment["postId"];

    comment["post"] = post.serialized();
}

function addSerializedUser(comment) {
    const {postId} = comment;

    const user = User.find({_id: postId});

    delete comment["userID"];

    comment["author"] = user.serialized();
}

module.exports = {getCommentsByUserId, getCommentsByPostId};
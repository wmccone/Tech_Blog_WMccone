const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');


Posts.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// These are going to associate the comments to a post
Posts.hasMany (Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// These are going to associate the comments to a USER


Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Posts, Comments };
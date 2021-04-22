const router = require('express').Router();
const { Comments } = require('../../models');



// CREATE new comment
router.post('/', async (req, res) => {
    try {
        //collects the comment data
      const commentData = await Comments.create({
        content: req.body.content,
        post_id: req.body.postId,
        user_id: req.session.user_id,
        comment_user: req.session.user_name

      });
  
        res.status(200).json(commentData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Allows a User to delete a blog comment
  router.delete('/:id', async (req, res) => {
    // delete a comment by its `id` value
    try {
      const commentData = await Comments.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with that id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
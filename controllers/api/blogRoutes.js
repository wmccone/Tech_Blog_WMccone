const router = require('express').Router();
const { Posts } = require('../../models');



// CREATE new user
router.post('/', async (req, res) => {
    try {
        //collects the post data
      const postData = await Posts.create({
        subject: req.body.subject,
        content_body: req.body.contentBody,
      });
  
        res.status(200).json(postData);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.put('/:id', async (req, res) => {
    // update a post by its `id` value
    try {
      const postData = await Posts.update({
        subject: req.body.subject,
        content_body: req.body.contentBody,
      }, {
        where: {
          id: req.params.id,
        },
      });
      if (!postData[0]) {
        res.status(404).json({ message: 'No information was sent, try again' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  router.delete('/:id', async (req, res) => {
    // delete a post by its `id` value
    try {
      const postData = await Posts.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with that id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
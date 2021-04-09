const router = require('express').Router();
const { Posts, User } = require('../models');

//render homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Posts.findAll({
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        });
    
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
    
        // Pass serialized data and session flag into template I will create
        res.render('homepage', { 
          posts, 
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json(err);
      }
    
});

//render posts by id
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        });
    
        const post = postData.get({ plain: true });
    
        res.render('post', {
          ...post,
          logged_in: req.session.logged_in
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/newpost', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
    res.render('newpost');
   
});

//renders the list of user posts
router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  try {
    // Get all posts and JOIN with user data
    const postData = await Posts.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template I will create
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render login page
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      }
    
      res.render('login');
});
//render the signup page
router.get('/signup', async (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('signup');
});
module.exports = router;
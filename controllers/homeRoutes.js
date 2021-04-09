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
    // This is going to allow us to read the session ID in handlebars
    const authPosts = posts.map((post) => {
      return { ...post, session_id: req.session.user_id }
    })
    // Pass serialized data and session flag into template I will create
    res.render('homepage', {
      posts: authPosts,
      logged_in: req.session.logged_in,

    });
  } catch (err) {
    res.status(500).json(err);
  }

});

//render posts by id
router.get('/post/:id', async (req, res) => {
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
      logged_in: req.session.logged_in,
      session_id: req.session.user_id
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
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
    const authPosts = posts.map((post) => {
      return { ...post, session_id: req.session.user_id }
    })

    // Pass serialized data and session flag into template I will create
    res.render('dashboard', {
      posts: authPosts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editpost/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  const postData = await Posts.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });
  const posts = postData.get({ plain: true });

  res.render('editpost', {
    ...posts,
    logged_in: req.session.logged_in

  });
});

router.get('/newpost', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('newpost', {
    logged_in: req.session.logged_in
  });

});
router.get('/newcomment/:id', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  const postData = await Posts.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });
  const posts = postData.get({ plain: true });

  res.render('newcomment', {
    ...posts,
    logged_in: req.session.logged_in
  });

});

//renders the list of user posts

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
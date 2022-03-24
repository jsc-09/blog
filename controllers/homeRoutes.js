const router = require('express').Router();
const { BlogPost , Comments , User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all blog post and JOIN with user data
      const blogPost = await BlogPost.findAll({
          where: {
              user_id: req.sessions.user_id
          }
      });
  
      // Serialize data so the template can read it
      const posts = blogPost.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('all-posts', { 
        layout: 'home',
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.redirect('login');
    }
  });

  router.get('/login', (req, res) => {
      //if session exists, redirect to the dashboard
    if (req.session.user_id) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
  });

  module.exports = router;
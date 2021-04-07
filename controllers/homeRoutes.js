const router = require('express').Router();
const { Posts, User } = require('../models');

//render homepage
router.get('/', async (req, res) => {});

//render posts by id
router.get('/posts/:id', async (req, res) => {});

//render user posts
router.get('/userposts', async (req, res) => {});

//render login page
router.get('/login', async (req, res) => {});
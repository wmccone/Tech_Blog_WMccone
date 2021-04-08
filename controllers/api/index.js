const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes')

router.use('/users', userRoutes);
router.use('/blogposts', userRoutes);

module.exports = router;
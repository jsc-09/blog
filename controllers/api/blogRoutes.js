const router = require('express').Router();
const { BlogPost, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// `/api/blogs` endpoint

    //find all blog posts - WORKING

router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            include: [{
                model: Comments
            }]
        });
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});



// view a single blog post - WORKING
router.get('/:id', async (req, res) => {
    try {
        newBlog = await BlogPost.findByPk(req.params.id, {
            attributes: ['title', 'body', 'date_created' ],
            include: [{
                model: Comments
            }]
        });
        if (!newBlog) {
            res.status(404).json({ message: 'The blog post you are looking for does not exist.' });
            return;
        }
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});


//create a blog post - WORKING
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

//update a post - WORKING
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateBlog = await BlogPost.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!updateBlog) {
            res.status(404).json({ message: 'The blog post you are looking for does not exist.' });
            return;
        }
        res.status(200).json(updateBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete a post - need to fix login

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await BlogPost.destroy({
            where:  {
                id: req.params.id,
            },
        });
        if (!blogData) {
            res.status(404).json({ message: 'Blog post does not exist'});
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
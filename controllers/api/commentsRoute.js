const router = require('express').Router();
const { Comments , BlogPost  } = require('../../models');
const withAuth = require('../../utils/auth');



//view all comments 

router.get('/', async (req, res) => {
    try {
        const newComment = await Comments.findAll({
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
})


// create a comment 
router.post('/', withAuth, async (req,res) => {
    try {
        const newComment = await Comments.create({
            ...req.body,
            user_id: req.params.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json({ message: "your comment was not saved."});
    }
});

module.exports = router;
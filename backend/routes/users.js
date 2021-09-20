const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    console.log(req.query.email)
    User.find({ email: req.query.email})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.postcode = req.body.postcode.toUpperCase().replace(/\s/g, '');

            user.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
});

module.exports = router;
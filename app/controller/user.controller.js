var User = require('../models/user.model')
const bcrypt = require('bcrypt');

exports.userCreate = (req, res) => {

    var newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        image: req.body.image,
        reviews: [req.body.reviews],
        products: [req.body.products],
    })
    newUser.save()
        .then(createdUser => {
            res.json({
                success: true,
                message: "user created",
                data: createdUser
            });
        }).catch(err => {
            res.json({
                success: false,
                message: "cannot create user",
                data: err
            });
        })

}



exports.userShowAll = (req, res) => {

    User.find({}).then(alluser => {
        res.json({
            success: true,
            message: "all user is retrieved",
            data: alluser
        });
    }).catch(err => {
        res.json({
            success: false,
            message: "cannot get all user",
            data: err
        });
    })
}

exports.userShow = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json({
                    success: true,
                    message: "user is retrieved",
                    data: user
                });
            } else {
                res.json({
                    success: false,
                    message: "cannot get user",
                    data: err
                });
            }

        })
        .catch(err => {
            res.json({
                success: false,
                message: "cannot get user",
                data: err
            });
        })
}

exports.userDelete = (req, res) => {
    User.findByIdAndRemove(req.params.id, { useFindAndModify: false })
        .then(data => {
            if (user) {
                res.json({
                    success: true,
                    message: 'User deleted',
                    data: data
                })
            } else {
                res.json({
                    success: false,
                    message: "cannot delete user",
                    data: err
                });
            }

        }).catch(err => {
            res.json({
                success: false,
                message: "cannot delete user",
                data: err
            });
        })
}

exports.userUpdate = (req, res) => {
    var updateUser = req.body
    if (updateUser.password) {
        updateUser.password = bcrypt.hashSync(req.body.password, 10)
    }
    User.findByIdAndUpdate(req.params.id, {
        $set: updateUser
    }, {
            new: true,
            useFindAndModify: false
        })
        .then(updated => {
            res.json({
                success: true,
                message: "user updated",
                data: updated
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: "cannot update user",
                data: err
            })
        })
}
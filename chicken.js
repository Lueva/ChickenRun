// Import chicken model
Chicken = require('./chickenModel');
mongoose = require('mongoose');

// Get all chickens
exports.index = function (req, res) {
    Chicken.get(function (err, chicken) {
        if (err) {
            res.json({
                status: "Error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Here's your chickens !",
            data: chicken
        });
    });
};

// Get a specific chicken
exports.get = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.chicken_id)) {
        Chicken.findById(req.params.chicken_id, function (err, chicken) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: 'Chicken information',
                data: chicken
            });
        });
    } else {
        res.json({
            status: "fail",
            message: 'This chicken does not exists.'
        });
    }
};

// Create new chicken actions
exports.new = function (req, res) {
    if (req.body.name && req.body.weight) {
        var chicken = new Chicken();
        chicken.name = req.body.name;
        chicken.birthday = req.body.birthday;
        chicken.weight = req.body.weight;
        chicken.steps = 0;
        chicken.isRunning = false;
        // save the new chicken
        chicken.save(function (err) {
            if (err) {
                res.json(err);
            }
            res.json({
                message: 'A chicken is born!',
                data: chicken
            });
        });
    } else {
        res.json({
            status: "Fail",
            message: 'You need to give your chicken a name & a weight.',
        });
    }
};

// Handle update chicken info
exports.update = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.chicken_id)) {
        Chicken.findById(req.params.chicken_id, function (err, chicken) {
            if (err) {
                res.send(err);
            }
            if (chicken) {
                chicken.name = req.body.name ? req.body.name : chicken.name;
                chicken.birthday = req.body.birthday;
                chicken.weight = req.body.weight ? req.body.weight : chicken.weight ;
                chicken.steps = req.body.steps;
                chicken.isRunning = req.body.isRunning;
                // save the chicken and check for errors
                chicken.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    res.json({
                        message: 'Your chicken information has been updated.',
                        data: chicken
                    });
                });
            } else {
                res.json({
                    status: "fail",
                    message: 'This chicken is not born yet!',
                });
            }
        });
    } else {
        res.json({
            status: "fail",
            message: 'This chicken does not exists.'
        });
    }
};

// Handle update chicken run info
exports.run = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.chicken_id)) {
        Chicken.findById(req.params.chicken_id, function (err, chicken) {
            if (err) {
                res.send(err);
            }
            if (chicken) {
                chicken.steps = chicken.steps + 1;
                chicken.isRunning = true;
                // save the chicken and check for errors
                chicken.save(function (err) {
                    if (err) {
                        res.json(err);
                    }
                    res.json({
                        message: 'Your chicken is running!',
                        data: chicken
                    });
                });
            } else {
                res.json({
                    status: "fail",
                    message: 'Your chicken is not born yet!',
                });
            }
        });
    } else {
        res.json({
            status: "fail",
            message: 'This chicken does not exists.'
        });
    }
};

// Handle delete chicken 
exports.delete = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.chicken_id)) {
        Chicken.remove({
            _id: req.params.chicken_id
        }, function (err, chicken) {
            if (err) {
                res.send(err);
            }
            res.json({
                status: "success",
                message: 'Your chicken has left. Be careful! '
            });
        });
    } else {
        res.json({
            status: "fail",
            message: 'This chicken does not exists.'
        });
    }
};
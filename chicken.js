// Import chicken model
Chicken = require('./chickenModel');

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
    Chicken.findById(req.params.chicken_id, function (err, chicken) {
        if (err) {
            res.send(err);
        }
        res.json({
            message: 'Chicken information',
            data: chicken
        });
    });
};

// Create new chicken actions
exports.new = function (req, res) {
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
};

// Handle update chicken info
exports.update = function (req, res) {
    Chicken.findById(req.params.chicken_id, function (err, chicken) {
        if (err) {
            res.send(err);
        }
        chicken.name = req.body.name;
        chicken.birthday = req.body.birthday;
        chicken.weight = req.body.weight;
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
    });
};

// Handle update chicken run info
exports.run = function (req, res) {
    Chicken.findById(req.params.chicken_id, function (err, chicken) {
        if (err) {
            res.send(err);
        }
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
    });
};

// Handle delete chicken 
exports.delete = function (req, res) {
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
};
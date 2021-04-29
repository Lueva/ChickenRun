// Import farmyard model
Farmyard = require('./farmyardModel');
Chicken = require('./chickenModel');
mongoose = require('mongoose');

// Get all chickens in the farmyard
exports.index = function (req, res) {
    Farmyard.find(function (err, farmyard) {
        if (err) {
            res.json({
                status: "Failed to get farmyard information.",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Here's your farmyard!",
            data: farmyard
        });
    }).populate("chickens");
};

// Add chicken to the farmyard
exports.add = function (req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.chicken_id)) {
        Chicken.findById(req.params.chicken_id, function (err, chicken) {
            if (err) {
                res.send(err);
            }
            if (chicken) {
                Farmyard.find(function (err, farmyard) {
                    if (err) {
                        res.send(err);
                    }
                    if (farmyard.length === 0) {
                        farmyard = new Farmyard();
                        farmyard.name = "My wonderful Farmyard";
                        farmyard.chickens = [];
                    } else {
                        farmyard = farmyard[0];
                    }
                    const chickenExists = farmyard.chickens.find(c => c === chicken._id);
                    if (chickenExists) {
                        res.json({
                            message: 'This chicken is already in your farmyard.',
                            data: farmyard
                        });
                    } else {
                        farmyard.chickens.push(chicken._id);
                    }

                    // save farmyard
                    farmyard.save(function (err) {
                        if (err) {
                            res.json(err);
                        }
                        res.json({
                            message: 'A chicken arrived in your farmyard',
                            data: farmyard
                        });
                    });
                });
            } else {
                res.json({
                    status: "fail",
                    message: 'This chicken is not borned yet! You can\'t add it to the farmyard.'
                });
            }
        });
    } else {
        res.json({
            status: "fail",
            message: 'This chicken is not borned yet! You can\'t add it to the farmyard.'
        });
    }
};
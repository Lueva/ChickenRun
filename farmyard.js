// Import farmyard model
Farmyard = require('./farmyardModel');
Chicken = require('./chickenModel');

// Get all chickens in the farmyard
exports.index = function (req, res) {
    Farmyard.find(function (err, farmyard) {
        if (err) {
            res.json({
                status: "error",
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
    Chicken.findById(req.params.chicken_id, function (err, chicken) {
        if (err) {
            res.send(err);
        }

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
            farmyard.chickens.push(chicken._id);

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
    });
};
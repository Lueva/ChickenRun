var mongoose = require('mongoose');
// Setup schema
var farmyardSchema = mongoose.Schema({
    chickens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "chicken"
    }],
    name: {
        type: String,
        required: true
    }
});

var Farmyard = module.exports = mongoose.model('farmyard', farmyardSchema);
module.exports.get = function (callback, limit) {
    Farmyard.find(callback).limit(limit);
}
var mongoose = require('mongoose');
// Setup schema
var chickenSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    isRunning: {
        type: Boolean,
        default: false
    },
    steps: {
        type: Number,
        default: 0
    },
    birthday: {
        type: Date,
        default: Date.now
    }
});

var Chicken = module.exports = mongoose.model('chicken', chickenSchema);
module.exports.get = function (callback, limit) {
    Chicken.find(callback).limit(limit);
}
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Chicken Run',
    });
});

var chicken = require('./chicken');
var farmyard = require('./farmyard');
// Contact routes
router.route('/farmyard')
    .get(farmyard.index);
router.route('/farmyard/:chicken_id')
    .post(farmyard.add);

router.route('/chicken')
    .get(chicken.index)
    .post(chicken.new);
router.route('/chicken/:chicken_id')
    .get(chicken.get)
    .put(chicken.update)
    .delete(chicken.delete);
router.route('/chicken/:chicken_id/run')
    .patch(chicken.run)
// Export API routes
module.exports = router;
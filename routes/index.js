const express = require('express');
const bookings = require('./bookings');
const router = express.Router();

// bookings
router.route('/bookings')
    .get(bookings.getByUser)
    .post( bookings.create);

router.route('/bookings/:id')
    .get(bookings.getById)
    .put(bookings.update)
    .patch( bookings.update)
    .delete(bookings.delete);

// --
module.exports = router;

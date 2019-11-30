const Booking = require('../models/booking');
// const ARTIST = require("../../const/role").ARTIST;
const ARTIST =  'ARTIST';
const HttpStatus = require('http-status-codes');

// function mapBooking(dbBooking) {
//     return {
//         _links: {
//             self: { href: '/bookings/' + dbBooking.id },
//             user: { href: '/users/' + dbBooking.user.id, title: dbBooking.user.displayName }
//         },
//         ...dbBooking
//     }
// }

exports.create = function (req, res) {
    const newBooking = new Booking(req.body);
    newBooking.user.id = req.user.id;
    newBooking.user.displayName = req.user.displayName;
    newBooking.save(function (err, savedBooking) {
        if (err) {
            if (err.name === 'ValidationError') {
                res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
            }
            else {
                res.status(HttpStatus.BAD_REQUEST).send(err);
            }
            return;
        }
        res.set('Location', '/bookings/' + savedBooking.id);
        res.status(HttpStatus.CREATED).send(savedBooking);
    });
};

exports.getById = function (req, res) {
    const bookingId = req.params.id;
    Booking.find({id: bookingId}, function(err, dbBooking) {
        if (err) {
            throw err;
        }
        if (dbBooking === null) {
            res.status(HttpStatus.NOT_FOUND).send({ message: 'Booking can not be found' });
        }
        else {
            res.status(HttpStatus.OK).send(dbBooking);
        }
    });
};

exports.getByUser = async function (req, res) {

    try {
        console.log("User request after authentication");
        let fieldToSearch = 'user.id';
        let userId = req.user.id;


        if (req.user.role === ARTIST)
            fieldToSearch = 'with';

        console.log("query" , {[fieldToSearch]: userId});
        const query = {[fieldToSearch]: userId};
        const bookings = await Booking.find(query).sort('-dateAndTime');
        res.status(HttpStatus.OK).send(bookings);

    } catch (e) {
        console.error(e);
        res.status(HttpStatus.BAD_REQUEST).send({message: "Something went wrong!", details: e});
    }

};

exports.update = function (req, res) {
    const bookingId = req.params.id;
    Booking.findById(bookingId, function(err, dbBooking) {
        if (err) {
            throw err;
        }
        if (dbBooking === null) {
            res.status(HttpStatus.NOT_FOUND).send({ message: 'Booking can not be found' });
        }
        else {
            // maybe we should add a check for a complete object in case of a PUT request?
            dbBooking.set(req.body) // updated object values from request body.
            dbBooking.save(function (err, updatedDbBooking) {
                if (err) {
                    if (err.name === 'ValidationError') {
                        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(err);
                    }
                    else {
                        res.status(HttpStatus.BAD_REQUEST).send(err);
                    }
                    return;
                }
                res.status(HttpStatus.OK).send(updatedDbBooking);
            })
        }
    });
};

exports.delete = function (req, res) {
    const bookingId = req.params.id;
    Booking.findById(bookingId, function(err, dbBooking) {
        if (err) {
            throw err;
        }
        if (dbBooking === null) {
            res.status(HttpStatus.NOT_FOUND).send({ message: 'Booking can not be found' });
        }
        else {
            dbBooking.remove(function (err) {
                if (err) {
                    res.status(HttpStatus.BAD_REQUEST).send(err);
                    return;
                }
                res.status(HttpStatus.OK).send({ message: 'Booking deleted' } );
            })
        }
    });
};

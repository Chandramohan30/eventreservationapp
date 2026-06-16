const eventmodel = require('../models/eventModel');
const reservationmodel=require('../models/reservationModel')

const getAllEvents = async (req, res, next) => {
    try {
        const allEvents = await eventmodel.find({})
        const openEventsCount = allEvents.filter(event => event.status === 'open').length
        const closedEventsCount = allEvents.filter(event => event.status === 'closed').length
        return res.status(200).json({
            success: true,
            message: 'All seats fetched successfully',
            data: allEvents,
            counts: {
                openEventscount: openEventsCount,
                closedEventscount: closedEventsCount
            }


        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch all seats',
            error: error.message
        });
    }
}

const getOpenEvents = async (req, res, next) => {
    try {
        const openEvents = await eventmodel.find({ status: 'open' })
        return res.status(200).json({
            success: true,
            message: 'Open Events fetched successfully',
            data: openEvents
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch open seats',
            error: error.message
        });
    }
};

const getClosedEvents = async (req, res, next) => {
    try {
        const closedEvents = await eventmodel.find({ status: 'closed' })
        return res.status(200).json({
            success: true,
            message: 'Closed seats fetched successfully',
            data: closedEvents
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch closed seats',
            error: error.message
        });
    }
};

const getByIdeventDetails = async (req, res, next) => {
    try {
        const eventid = req.params.id;

        const eventdetail = await eventmodel.findById(eventid);

        if (!eventdetail) {
            return res.status(404).json({
                success: false,
                message: 'event not found',
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: 'event details fetched successfully',
            data: eventdetail
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch event details',
            error: error.message
        });
    }
};

const getByIdPassengerDetails = async (req, res, next) => {
    try {
        const eventid = req.params.id;

        const eventdetail = await eventmodel.findById(eventid);


        if (!eventdetail) {
            return res.status(404).json({
                success: false,
                message: 'event not found',
                data: null
            });
        }


        if (eventdetail.status === 'open') {
            return res.status(400).json({
                success: false,
                message: 'No passenger found, seat is not booked yet',
                data: null
            });
        }


        const passengerdetails = {
            passengerseat: eventdetail.seatNumber,
            passengername: eventdetail.firstName + " " + eventdetail.lastName,
            passengeremail: eventdetail.email,
            passengerbookedat: eventdetail.bookedAt
        };

        return res.status(200).json({
            success: true,
            message: 'Passenger details fetched successfully',
            data: passengerdetails
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch passenger details',
            error: error.message
        });
    }
};

const updateeventDetails = async (req, res, next) => {
    try {
        const eventid = req.params.id;
        const updatedeventDetails = req.body;


        const eventdetail = await eventmodel.findById(eventid);

        if (!eventdetail) {
            return res.status(404).json({
                success: false,
                message: 'event not found',
                data: null
            });
        }


        const updatedevent = await eventmodel.findByIdAndUpdate(
            eventid,
            { $set: updatedeventDetails },
            { returnDocument: 'after', runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: 'event updated successfully',
            data: updatedevent
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update event',
            error: error.message
        });
    }
};

const deleteeventdetails = async (req, res, next) => {
    try {
        const eventid = req.params.id;


        const eventdetail = await eventmodel.findById(eventid);

        if (!eventdetail) {
            return res.status(404).json({
                success: false,
                message: 'event not found',
                data: null
            });
        }


        await eventmodel.findByIdAndDelete(eventid);

        return res.status(200).json({
            success: true,
            message: 'event deleted successfully',
            data: null
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete event',
            error: error.message
        });
    }
};


const seedSeats = async (req, res, next) => {
    try {
        
        await reservationmodel.insertMany(req.body);

        return res.status(201).json({
            success: true,
            message: 'Seats seeded successfully',
           
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error seeding seats',
            error: error.message
        });
    }
};

module.exports = { getAllEvents, getOpenEvents, getClosedEvents, getByIdeventDetails, getByIdPassengerDetails, updateeventDetails, deleteeventdetails, seedSeats };
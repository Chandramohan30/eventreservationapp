const express = require('express');
const router = express.Router();
const { getAllEvents, getByIdeventDetails, getByIdPassengerDetails, updateeventDetails,deleteeventdetails, seedSeats } = require('../controllers/eventController');
router.get('/listevents',getAllEvents );
router.post('/create', seedSeats);
router.get('/:id', getByIdeventDetails);
router.get('/:id/passengerdetails', getByIdPassengerDetails);
router.put('/:id/updateeventdetails', updateeventDetails);
router.delete('/:id/deleteeventdetails', deleteeventdetails);




module.exports = router;

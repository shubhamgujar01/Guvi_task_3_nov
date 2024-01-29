const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomSchema = new Schema({
    Room_name : {
        type: String
    },
    status: {
        type: String,
        default: "Not Booked"
    },
    No_of_Seats: {
        type: Number,
        required: true
    },
    amenities: [{ type: String }],
    Price: {
        type: String,
        required: true
    },
    CustomerDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
      }
});

const Room = mongoose.model('Room', roomSchema)
module.exports = Room;
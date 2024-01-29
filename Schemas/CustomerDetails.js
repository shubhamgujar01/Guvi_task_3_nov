const mongoose = require('mongoose');
const { Schema } = mongoose;

const custSchema = new Schema({
   name: {
    type: String,
    required: true
   },
   Date : {
    type: Date
   },
   start_time: {
    type: String
   },
   end: {
    type: String
   },
   RoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
   }
  
});

const Customer = mongoose.model('Customer', custSchema)
module.exports = Customer;
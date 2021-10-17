const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  events: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Event",
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
},{
    timestamps:true
});

const Booking = mongoose.model("Booking", bookingSchema);

exports.Booking = Booking;

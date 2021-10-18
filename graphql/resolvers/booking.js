const { Event } = require("../../model/event");
const { Booking } = require("../../model/booking");
const { transformEvent, transformBooking } = require("./merge");

module.exports = {
  //bookings
  bookings: async (args,req) => {
    if(!req.isAuth){
      return new Error("Unauthenticated")
    }

    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      throw error;
    }
  },

  //create a booking
  bookEvent: async (args,req) => {
    if(!req.isAuth){
      return new Error("Unauthenticated")
    }

    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const newBooking = new Booking({
        user: "616bc8cf92bc1b30bc9db2f6",
        events: fetchedEvent,
      });
      const result = await newBooking.save();
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },

  //canceling a booking
  cancelBooking: async (args,req) => {
    if(!req.isAuth){
      return new Error("Unauthenticated")
    }

    try {
      const booking = await Booking.findById(args.bookingId).populate("events");
      console.log(booking.events);
      const event = transformEvent(booking.events);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
};

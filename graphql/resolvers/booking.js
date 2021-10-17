const { Event } = require("../../model/event");
const { Booking } = require("../../model/booking");
const { dateToString } = require("../../helpers/date");
const { user,singleEvent } = require("./merge");


//refactoring
const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: new Date(event._doc.date).toISOString(),
    creator: user.bind(this, event.creator),
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking.user),
    event: singleEvent.bind(this, booking.events),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  }
}


module.exports = {
  //bookings
  bookings: async () => {
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
  bookEvent: async (args) => {
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
  cancelBooking: async (args) => {
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

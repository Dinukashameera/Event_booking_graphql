const { dateToString } = require("../../helpers/date");
const { Event } = require("../../model/event");
const { User } = require("../../model/user");

//getting a list of events of a user
//list of event ids are passed as arguments

const events = async (eventIds) => {
    try {
      const events = await Event.find({ _id: { $in: eventIds } });
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  };
  
  //this function gives single event
  const singleEvent = async (eventId) => {
    try {
      const event = await Event.findById(eventId);
      return transformEvent(event);
    } catch (error) {
      throw error;
    }
  };
  
  //getting a single user by user id
  const user = async (userId) => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents),
      };
    } catch (error) {
      throw error;
    }
  };
  
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
  exports.transformEvent = transformEvent
  exports.transformBooking = transformBooking
 
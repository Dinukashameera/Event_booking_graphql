const { Event } = require("../../model/event");
const { User } = require("../../model/user");

const transformEvent = (event) => {
    return {
      ...event._doc,
      _id: event.id,
      date: new Date(event._doc.date).toISOString(),
      creator: user.bind(this, event.creator),
    };
  };

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
  

  exports.user = user
  exports.singleEvent = singleEvent
  exports.events = events
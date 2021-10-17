const { Event } = require("../../model/event");
const { User } = require("../../model/user");
const { Booking } = require("../../model/booking");
const bcrypt = require("bcryptjs");

//getting a list of events of a user
//list of event ids are passed as arguments
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator),
      };
    });

    return events;
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

module.exports = {
  //contains a bundle of resolvers
  //get events
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (error) {
      console.log(error);
    }
  },

  //create events
  createEvent: async (args) => {
    const event = new Event({
      title: args.event.title,
      description: args.event.description,
      price: +args.event.price,
      date: new Date(args.event.date),
      creator: "616bc8cf92bc1b30bc9db2f6",
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };
      const creator = await User.findById("616bc8cf92bc1b30bc9db2f6");

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //create users
  createUser: async (args) => {
    try {
      const checkUserExist = await User.findOne({ email: args.user.email });
      if (checkUserExist) {
        throw new Error("User already exist");
      } else {
        const hashedPassword = await bcrypt.hash(args.user.password, 12);
        const user = new User({
          email: args.user.email,
          password: hashedPassword,
        });

        let result = await user.save();
        result.password = null;

        return result;
      }
    } catch (error) {
      throw error;
    }
  },

  //bookings
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          _id: booking.id,
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        };
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
      console.log(result)
 
        console.log("++++ result.id ", result.id);
        return {
          ...result._doc,
          _id: result.id,
          createdAt: new Date(result._doc.createdAt).toISOString(),
          updatedAt: new Date(result._doc.updatedAt).toISOString(),
        };
      
    } catch (error) {
      throw error;
    }
  },
};

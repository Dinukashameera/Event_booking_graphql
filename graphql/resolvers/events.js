const { Event } = require("../../model/event");
const { User } = require("../../model/user");
const { dateToString } = require("../../helpers/date");
const { user } = require("./merge");

//refactoring
const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: new Date(event._doc.date).toISOString(),
    creator: user.bind(this, event.creator),
  };
};

module.exports = {
  //contains a bundle of resolvers
  //get events
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
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
      date: dateToString(args.event.date),
      creator: "616bc8cf92bc1b30bc9db2f6",
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
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
};

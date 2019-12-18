import { Meteor } from 'meteor/meteor';

Websites = new Mongo.Collection("websites");
Meteor.startup(() => {
  // code to run on server at startup
});

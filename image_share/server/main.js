import { Meteor } from 'meteor/meteor';

//Images = new Mongo.Collection("images");
Meteor.startup(() => {
  // code to run on server at startup
  if (Images.find().count()==0){
    for(var i=1;i<23;i++){
    Images.insert(
      {
      img_src: "img_"+i+".jpg",
      img_alt: "image number "+i
      }
      );
    } // end of for image insert
    console.log("server main.js says: "+Images.find().count())
  }
});

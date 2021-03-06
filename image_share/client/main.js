import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
//Images = new Mongo.Collection("images");

//routing
Router.configure({
  layoutTemplate : 'ApplicationLayout'
});


Router.route('/', function () {
  this.render('welcome',{
    to:"main"
  });
});

Router.route('/images', function () {
  this.render('navbar',{
    to:"navbar"
  });
  this.render('images',{
    to:"main"
  });
});


Router.route('/image/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('image', {
    to:"main",
    data:function(){
      return Images.findOne({_id:this.params._id});
    }
  });
});



  // Session.set("imageLimit", 8);
  //
  // lastScrollTop = 0;
  // $(window).scroll(function(event){
  //   //test if we are near the bottom of the window
  //   if($(window).scrollTop() + $(window).heigth() > $(document).height() - 100){
  //     //where are we in the page?
  //     var scrollTop = $(this).scrollTop();
  //     //test if we are going down
  //     if(scrollTop > lastScrollTop){
  //       //yes we are heading down..
  //       Session.set("imageLimit", Session.get("imageLimit") + 4);
  //     }
  //   }
  // });



Accounts.ui.config({
  passwordSignupFields:"USERNAME_AND_EMAIL"
});

Template.images.helpers({
  images:function(){
    if(Session.get("userFilter")){ //they set a filter
      return Images.find({createdBy:Session.get("userFilter")}, {sort : {createdOn:-1, rating : -1}});
    }
    else {
        return Images.find({}, {sort : {createdOn:-1, rating : -1}});
    }
  },

  image_filtering:function(){
    if(Session.get("userFilter")){ //they set a filter
        return true;
    }
    else {
      return false;
    }
  },

  getFilterUser:function(){
    if(Session.get("userFilter")){
      var user = Meteor.users.findOne({_id:Session.get("userFilter")})
      return user.username;
    }
    else{
      return false;
    }
  },

  getUser:function(user_id){
    var user = Meteor.users.findOne({_id:user_id});
    if(user){
      return user.username;
    }
    else{
      return "anon";
    }
  }
});
Template.body.helpers({username:function(){
    if(Meteor.user()){
      return Meteor.user().username;
    }
    else{
      return "Anonymous User";
    }
  }
});


Template.images.events({
  'click .js-del-image': function(event){
    console.log(event);
    //$(event.target).css("width", "50px");
    var curr_id = this._id;
    $("#"+curr_id).hide('slow',function(){
        Images.remove({"_id":curr_id});
    })
  },

  'click .js-rate-image': function(event){
    // console.log("You Clicked A Star");
    var rating = $(event.currentTarget).data("userrating");
    console.log(rating);

    var image_id = this.id;
    console.log(image_id);

    Images.update({_id:image_id}, {$set : {rating : rating} });
  },

  'click .js-show-image-form':function(event){
      $("#image_add_form").modal('show');
    },

  'click .js-set-image-filter':function(event){
    Session.set("userFilter", this.createdBy);
  },

  'click .js-unset-image-filter':function(event) {
    Session.set("userFilter", undefined);
  }

});

Template.image_add_form.events({
  'submit .js-add-image':function(event){
    var img_src, img_alt;
    img_src = event.target.img_src.value;
    img_alt = event.target.img_alt.value;
    console.log("src: "+img_src+" alt:"+img_alt);

    if(Meteor.user()){
      Images.insert({
        img_src:img_src,
        img_alt:img_alt,
        createdOn:new Date(),
        createdBy: Meteor.user()._id
      });
    }
     $("#image_add_form").modal('show');
    return false;
  }
});




//Template.image_upload.helpers({image_upload:image_data})

// Template.image_upload.events({
//   'click .js-image':function(event){
//       alert("Hello !")
//   }
// });

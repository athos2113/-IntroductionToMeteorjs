import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//adding routing
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// the main route. showing the list of sites.
Router.route('/', function () {
  this.render('siteList');
});

// this route is for the discussion page for a site
Router.route('/discussSite/:_id', function () {
    var siteId = this.params._id;
    site = Websites.findOne({_id:siteId});
    this.render('discussSite', {data:site});
});


// this helper gets the data from the collection for the site-list Template

Template.siteList.helpers({
    'all_websites':function(){
        return Websites.find({});
    },
    'safer_email':function(email){
        if (email.indexOf('@')!=-1){// we have an email
            return email.split('@')[0];
        }
        else{// probably anonymouse.
            return email;
        }
    }
});


// event listeners on the addSiteForm template
Template.addCommentForm.events({
    // this runs when they click the add button... you need to compete it
 'click .js-add-comment':function(event){
     var comment_text = $('#comment_input').val();// get the form value using jquery...
     var user = 'anonymous person';
     // the 'this' variable contains
     // the data that this template is displaying
     // which is the Website item
     var site = this;
     if (Meteor.user()){
         user = Meteor.user().emails[0].address
     }
     var comment = {"text":comment_text,
                    "siteId":site._id,
                 "createdOn":new Date(),
                 "createdBy":user};// create a simple object to insert to the collectoin
    Comments.insert(comment);
     return false;
 }
});

// event listeners on the addSiteForm template
Template.addSiteForm.events({
    // this runs when they click the add button... you need to compete it
 'click .js-add-site':function(event){
     var url = $('#url_input').val();// get the form value using jquery...
     var user = 'anonymous person';
     if (Meteor.user()){
         user = Meteor.user().emails[0].address
     }
     var site = {"url":url,
                 "createdOn":new Date(),
                 "createdBy":user};// create a simple object to insert to the collectoin
     Websites.insert(site);
     return false;
 }
});

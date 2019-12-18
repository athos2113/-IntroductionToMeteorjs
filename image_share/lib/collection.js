
Images = new Mongo.Collection("images");

//set up security on Images Collection
Images.allow({
  insert:function(userId, doc){

    if(Meteor.user()){
      if(userId != doc.createdBy){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  },

  remove:function(userId, doc){
    return true;
  }
})

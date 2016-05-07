"use strict";

 const mongoose = require('mongoose')
 , Schema = mongoose.Schema
 , UserSchema = new Schema({
    githubId: String
    , avatar: String
    , profileUrl: String
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals : true });
UserSchema.virtual('date').get(function(){ return this._id.getTimestamp(); });

mongoose.model('User', UserSchema);
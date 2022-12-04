const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true, 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email adress.']
    },
    thoughts: {
      type: String,
      required: true,
      max_length: 50,
    },
    friends: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'User',
        } 
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('student', userSchema);

module.exports = User;

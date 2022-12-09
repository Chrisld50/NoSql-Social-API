const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment/moment');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 180,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateStamp => moment(dateStamp).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function (){
  return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
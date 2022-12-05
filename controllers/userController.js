//const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              //grade: await grade(req.params.studentId), code to figure out. 
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((User) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.findOneAndUpdate(
              { users: req.params.usersId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  
  addReaction(req, res) {
    console.log('You are adding reaction');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

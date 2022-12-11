//const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {

  getUsers(req, res) {
    User.find({})
      .select("-__v")
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err)
        res.status(404).json(err);
      })
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId})
      .select('-__v')
      .lean()
      .then( (userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({userData})
      )
      .catch((err) => {
        console.log(err);
         res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body ,
      { runValidators: true, new: true }
    )
      .then(userData => {
        if(!userData) {
          res.status(404).json({message: 'User not found!'})
          return;
        }
        res.json(userData)
      })
      
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.Id })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  addToFriendList(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$addToSet: {friends: req.params.friendId}},
      {runValidators: true, new: true}
    )
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err)
      res.status(404).json(err);
    })
  },

  removeFromFriendList(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: {friends: req.params.friendId}},
      {runValidators: true, new: true}
    )
    .then((userData) =>
        !userData
          ? res.status(404).json({
              message: 'Error!',
            })
          : res.json({ message: 'Friend removed from list!' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}


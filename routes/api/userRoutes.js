const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  updateUser,
  createUser,
  deleteUser,
  addToFriendList,
  removeFromFriendList,
} = require('../../controllers/userController');


router
.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

// /api/users/:userId/friends/friendId
router
.route('/:userId/friends/:friendId')
.post(addToFriendList);

// /api/users/:user/friends/friendId
router
.route('/:userId/friends/:friendId')
.delete(removeFromFriendList);

module.exports = router;

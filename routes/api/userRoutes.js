const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addReaction,
  removeReaction,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:UserId').get(getSingleUser).delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeReaction);

module.exports = router;

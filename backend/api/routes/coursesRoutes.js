const express = require('express');
const {getAllCourses,createCourse,updateCourse,deleteCourse} = require('../controllers/coursesController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/',authenticate, getAllCourses);
router.post('/',authenticate, createCourse);
router.put('/:code',authenticate, updateCourse);
router.delete('/:code',authenticate, deleteCourse);

module.exports = router;
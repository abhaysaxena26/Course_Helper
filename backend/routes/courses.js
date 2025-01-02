const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// Create a course
router.post('/', async (req, res) => {
  const { image, title, code, credits, description } = req.body;
  try {
    const newCourse = await pool.query(
      'INSERT INTO courses (image, title, code, credits, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [image, title, code, credits, description]
    );
    res.json(newCourse.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Read all courses
router.get('/', async (req, res) => {
  try {
    const allCourses = await pool.query('SELECT * FROM courses');
    res.json(allCourses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { image, title, code, credits, description } = req.body;
  try {
    const updateCourse = await pool.query(
      'UPDATE courses SET image = $1, title = $2, code = $3, credits = $4, description = $5 WHERE id = $6 RETURNING *',
      [image, title, code, credits, description, id]
    );
    res.json(updateCourse.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM courses WHERE id = $1', [id]);
    res.send('Course deleted successfully');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
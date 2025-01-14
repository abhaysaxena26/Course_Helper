const pool = require('../db/db'); // Database connection pool

// Fetch all courses
const getAllCourses = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses ORDER BY code');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching courses:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    try {
        const { title, code, credits, description, image } = req.body;
        if (!title || !code || !credits) {
            return res.status(400).json({ error: 'Title, code, and credits are required' });
        }

         // Check for duplicate course code
        const duplicateCheck = await pool.query('SELECT * FROM courses WHERE code = $1', [code]);
        if (duplicateCheck.rows.length > 0) {
            return res.status(400).json({ error: 'Course with this code already exists' });
        }
        const result = await pool.query(
            'INSERT INTO courses (title, code, credits, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, code, credits, description, image]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating course:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    // const { code } = req.params;
    const { code , image, title, credits, description } = req.body;

    // if (!code) { return res.status(400).json({ error: 'Course ID is required' });}

    try {
        const result = await pool.query(
            'UPDATE courses SET image = $1, title = $2, code = $3, credits = $4, description = $5 WHERE code = $6 RETURNING *',
            [image, title, code, credits, description, code]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        console.log(result.rows[0]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updating course:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    const { code } = req.params;

    if (!code) {
        return res.status(400).json({ error: 'Course code is required' });
    }
    try {
        const result = await pool.query('DELETE FROM courses WHERE code = $1', [code]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error('Error deleting course:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const pool = require('../db/db');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
 

  try {
    console.log("Received sign-up request:", { email, password });

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log(userExists);
    if(userExists.rows.length > 0) return res.status(409).json({message: 'User already exists.'});
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully.");

    await pool.query('INSERT INTO users (email,password_hash) VALUES ($1,$2)', [email,hashedPassword]);
    console.log("User registered successfully:", email);
    res.status(201).json({message: 'User registered successfully. Redirecting to Login page...'});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error registering user.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({token});
    
  } catch (error) {
     console.log(error);
     res.status(500).json({ error: 'Error logging in.' });
  }
};
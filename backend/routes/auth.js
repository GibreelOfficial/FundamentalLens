import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

const tempUsersDB = [];

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    tempUsersDB.push(user);
    res.status(201).send({ message: 'User registered' });
  } catch {
    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  const user = tempUsersDB.find(user => user.username === req.body.username);
  if (!user) return res.status(400).send('User not found');
  
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'fallback_secret');
      res.json({ accessToken });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch {
    res.status(500).send();
  }
});

export default router;
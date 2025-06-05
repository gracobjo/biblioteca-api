const users = require('../models/user.model');

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
};

exports.createUser = (req, res) => {
  const newUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  const updatedUser = { ...users[index], ...req.body };
  users[index] = updatedUser;
  res.json(updatedUser);
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  users.splice(index, 1);
  res.status(204).send();
};
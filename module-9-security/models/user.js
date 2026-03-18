// models/user.js
const users = [];

exports.create = (userData) => {
    const newUser = { id: users.length + 1, role: 'user', ...userData };
    users.push(newUser);
    return newUser;
};

exports.findByEmail = (email) => users.find(u => u.email === email);
exports.findById = (id) => users.find(u => u.id === id);
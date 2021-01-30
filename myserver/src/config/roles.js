// const roles = ['user', 'admin']
const roles = ['none', 'user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], 'owner');
roleRights.set(roles[2], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};

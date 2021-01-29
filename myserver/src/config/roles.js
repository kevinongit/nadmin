// const roles = ['user', 'admin']
const roles = ['none', 'clerk', 'cashier', 'manager'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], []);
roleRights.set(roles[2], []);
roleRights.set(roles[3], ['getUsers', 'manageUsers']);

module.exports = {
  roles,
  roleRights,
};

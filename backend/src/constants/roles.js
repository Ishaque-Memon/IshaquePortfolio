// User role for the application
export const ROLES = {
  ADMIN: 'admin'
};

// Validate if role exists
export const isValidRole = (role) => {
  return role === ROLES.ADMIN;
};

export default ROLES;

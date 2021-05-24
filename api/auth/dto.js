const single = (data, token) => ({
  id: data._id,
  name: data.name,
  email: data.email,
  role: data.role,
  google: data.google,
  active: data.active,
  token
});

module.exports = { single };

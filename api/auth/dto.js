const single = (data, token) => ({
  id: data._id,
  name: data.name,
  email: data.email,
  image: data.image ? data.image : '',
  role: data.role,
  google: data.google,
  active: data.active,
  token
});

module.exports = { single };

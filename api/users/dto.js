const single = (data) => ({
  id: data._id,
  name: data.name,
  email: data.email,
  image: data.image ? data.image : '',
  role: data.role,
  google: data.google,
  active: data.active,
});
const multiple = (data) => data.map((item) => single(item));
const createdUser = (data, token) => ({
  id: data._id,
  name: data.name,
  email: data.email,
  image: data.image ? data.image : '',
  role: data.role,
  google: data.google,
  active: data.active,
  token,
});

module.exports = { single, multiple, createdUser };

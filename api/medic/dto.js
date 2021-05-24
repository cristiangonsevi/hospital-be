const single = (data) => ({
  id: data._id,
  name: data.name,
  image: data.image ? data.image : '',
  active: data.active,
  user: {
    id: data.user._id,
    name: data.user.name,
    image: data.user.image ? data.user.image : '',
  },
  hospital: {
    id: data.hospital._id,
    name: data.hospital.name,
    image: data.hospital.image ? data.hospital.image : '',
  },
});
const multiple = (data) => data.map((item) => single(item));

module.exports = { single, multiple };

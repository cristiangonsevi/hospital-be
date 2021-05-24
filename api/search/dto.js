const singleUser = (data) => ({
  id: data._id,
  name: data.name,
  email: data.email,
  image: data.image ? data.image : '',
  role: data.role,
  google: data.google,
  active: data.active,
});
const singleMedic = (data) => ({
  id: data._id,
  name: data.name,
  email: data.email,
  image: data.image ? data.image : '',
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
  active: data.active,
});
const singleHospital = (data) => ({
  id: data._id,
  name: data.name,
  image: data.image ? data.image : '',
  user: {
    id: data.user._id,
    name: data.user.name,
    image: data.user.image ? data.user.image : '',
  },
  active: data.active,
});
const multipleUsers = (data) => data.map((item) => singleUser(item));

const multipleMedics = (data) => data.map((item) => singleMedic(item));
const multipleHospitals = (data) => data.map((item) => singleHospital(item));

module.exports = {
  singleUser,
  singleMedic,
  singleHospital,
  multipleUsers,
  multipleMedics,
  multipleHospitals,
};

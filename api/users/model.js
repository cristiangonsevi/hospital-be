const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'USER',
  },
  google: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

UserSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, password,...object } = this.toObject();
  return object;
});

module.exports = model('User', UserSchema);

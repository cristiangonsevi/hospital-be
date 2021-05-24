const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

HospitalSchema.method('toJSON', function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Hospital', HospitalSchema);

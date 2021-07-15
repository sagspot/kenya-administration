import mongoose from 'mongoose';

const countySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'County exist'],
    dropDups: true,
    trim: true,
  },
  headquaters: { type: String, required: true },
  countycode: { type: Number, required: true, unique: true },
  province: { type: 'ObjectId', ref: 'Province', required: true },
});

export default mongoose.model('County', countySchema);

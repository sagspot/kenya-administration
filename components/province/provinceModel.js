import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'Province exist'],
    dropDups: true,
    trim: true,
  },
  headquaters: { type: String, required: true },
});

export default mongoose.model('Province', provinceSchema);

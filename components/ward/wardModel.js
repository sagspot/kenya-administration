import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'constituency exist'],
    dropDups: true,
    trim: true,
  },
  constituency: { type: 'ObjectId', ref: 'Constituency', required: true },
  county: { type: 'ObjectId', ref: 'County', required: true },
});

export default mongoose.model('Ward', wardSchema);

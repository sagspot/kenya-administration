import mongoose from 'mongoose';

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, 'constituency exist'],
    dropDups: true,
    trim: true,
  },
  county: { type: 'ObjectId', ref: 'County', required: true },
});

export default mongoose.model('Constituency', constituencySchema);

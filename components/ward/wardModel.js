import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcounty: { type: 'ObjectId', ref: 'Subcounty' },
  county: { type: 'ObjectId', ref: 'County' },
});

export default mongoose.model('Ward', wardSchema);

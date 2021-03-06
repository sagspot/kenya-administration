import mongoose from 'mongoose';
import County from './countyModel.js';

export const getCounties = async (req, res) => {
  try {
    const counties = await County.find();
    const count = counties.length;
    res.status(200).json({ count, counties });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getProvinceCounties = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(
    req.params.provinceid
  );
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid province ID' });
  try {
    const counties = await County.find({ province: req.params.provinceid });
    if (counties.length === 0)
      return res.status(404).json({
        msg: 'No counties found. Check your url parameter and try again',
      });
    const count = counties.length;
    res.status(200).json({ count, counties });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCounty = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(req.params.countyid);
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid county ID' });
  try {
    const county = await County.findById(req.params.countyid).populate(
      'province',
      'name'
    );
    if (!county)
      return res.status(404).json({
        msg: 'County not found. Check your url parameter and try again',
      });
    res.status(200).json({ county });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postCounty = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(req.body.province);
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid province ID' });
  const countyExist = await County.findOne({ name: req.body.name });
  if (countyExist) return res.status(409).json({ msg: 'County exist' });
  try {
    const county = new County({
      name: req.body.name.toLowerCase(),
      headquaters: req.body.headquaters.toLowerCase(),
      countycode: req.body.countycode,
      province: req.body.province,
    });
    const newCounty = await county.save();
    res.status(201).json({ msg: 'Success! County created', County: newCounty });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

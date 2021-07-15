import mongoose from 'mongoose';
import County from './countyModel.js';

export const getCounties = async (req, res) => {
  try {
    const counties = await County.find();
    res.status(200).json({ counties });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getProvinceCounties = async (req, res) => {
  try {
    const counties = await County.find({ province: req.params.provinceid });
    res.status(200).json({ counties });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCounty = async (req, res) => {
  try {
    const county = await County.findOne({
      name: req.params.name.toLowerCase(),
    }).populate('province', 'name');
    res.status(200).json({ county });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postCounty = async (req, res) => {
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

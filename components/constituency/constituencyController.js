import mongoose from 'mongoose';
import Constituency from './constituencyModel.js';
import County from '../county/countyModel.js';

export const getConstituencies = async (req, res) => {
  try {
    const constituencies = await Constituency.find();
    res.status(200).json({ constituencies });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getCountyConstituencies = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(req.params.countyid);
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid county ID' });
  try {
    const constituencies = await Constituency.find({
      county: req.params.countyid,
    });
    if (constituencies.length === 0)
      return res.status(404).json({
        msg: 'No constituencies found. Check your url parameter and try again',
      });
    res.status(200).json({ constituencies });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getConstituency = async (req, res) => {
  try {
    const constituency = await Constituency.find({
      name: req.params.name,
    }).populate('county', 'name');
    if (constituency.length === 0)
      return res.status(404).json({
        msg: 'Constituency not found. Check your url parameter and try again',
      });

    res.status(200).json({ Constituency: constituency });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const postConstituency = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(req.body.county);
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid county ID' });

  const countyExist = await County.findById(req.body.county);
  if (!countyExist) return res.status(404).json({ msg: 'County not found' });

  const constituencyExist = await Constituency.findOne({
    name: req.body.name.toLowerCase(),
  });
  if (constituencyExist)
    return res.status(409).json({ msg: 'Constituency exists' });

  try {
    const constituency = new Constituency({
      name: req.body.name.toLowerCase(),
      county: req.body.county,
    });

    const newConstituency = await constituency.save();
    res.status(201).json({
      msg: 'Success! Constituency created',
      Constituency: newConstituency,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

import mongoose from 'mongoose';
import Constituency from '../constituency/constituencyModel.js';
import Ward from './wardModel.js';

export const getWards = async (req, res) => {
  try {
    const wards = await Ward.find();
    res.status(200).json({ wards });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getWard = async (req, res) => {
  try {
    const ward = await Ward.find({
      name: req.params.name,
    }).populate([
      { path: 'constituency', select: 'name' },
      { path: 'county', select: 'name' },
    ]);
    if (ward.length === 0)
      return res.status(404).json({
        msg: 'Ward not found. Check your url parameter and try again',
      });
    res.status(200).json({ Ward: ward });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const getConstituencyWard = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(
    req.params.constituencyid
  );
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid constituency ID' });
  try {
    const wards = await Ward.find({
      constituency: req.params.constituencyid,
    });
    if (wards.length === 0)
      return res.status(404).json({
        msg: 'No wards found. Check your url parameter and try again',
      });
    res.status(200).json({ wards });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postWard = async (req, res) => {
  const validateObjectId = await mongoose.isValidObjectId(
    req.body.constituency
  );
  if (!validateObjectId)
    return res.status(400).json({ msg: 'Invalid constituency ID' });

  const constituencyExist = await Constituency.findById(req.body.constituency);
  if (!constituencyExist)
    return res.status(404).json({ msg: 'Constituency not found' });

  const wardExist = await Ward.findOne({
    name: req.body.name.toLowerCase(),
  });
  if (wardExist) return res.status(409).json({ msg: 'Ward exists' });

  const countyArray = await Constituency.find(
    { _id: req.body.constituency },
    'county'
  );
  const county = countyArray[0].county;

  try {
    const ward = new Ward({
      name: req.body.name.toLowerCase(),
      constituency: req.body.constituency,
      county,
    });

    const newWard = await ward.save();
    res.status(201).json({
      msg: 'Success! Ward created',
      Ward: newWard,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

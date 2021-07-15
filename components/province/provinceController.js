import mongoose from 'mongoose';
import Province from './provinceModel.js';

export const getProvinces = async (req, res) => {
  try {
    const provinces = await Province.find();
    res.status(200).json({ provinces });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const postProvince = async (req, res) => {
  const provinceExist = await Province.findOne({ name: req.body.name });
  if (provinceExist) return res.status(409).json({ msg: 'Province exist' });
  try {
    const province = new Province({
      name: req.body.name.toLowerCase(),
      headquaters: req.body.headquaters.toLowerCase(),
    });
    const newProvince = await province.save();
    res.status(201).json({ msg: 'Success! Province created', newProvince });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

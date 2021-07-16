import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';
import province from './components/province/province.js';
import county from './components/county/counties.js';
import constituency from './components//constituency/constituencies.js';
import ward from './components/ward/wards.js';

dotenv.config();
const app = express();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log(chalk.cyan('Connected to Mongodb'))
);

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/province', province);
app.use('/api/v1/county', county);
app.use('/api/v1/constituency', constituency);
app.use('/api/v1/ward', ward);

app.get('/', (req, res) => {
  res.send('Home page is OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(chalk.magenta.bold(`Server is listening on port ${PORT}`))
);

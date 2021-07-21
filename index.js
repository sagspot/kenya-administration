import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import province from './components/province/province.js';
import county from './components/county/counties.js';
import constituency from './components//constituency/constituencies.js';
import ward from './components/ward/wards.js';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kenyan Counties Constituencies & Wards',
      version: '1.0.0',
      description:
        'List of Counties, Constituencies and Wards in Kenya. If you find any spelling mistakes, or any errors, please do create a [new issue on github.](https://github.com/sagspot/kenya-counties-constituencies-wards/issues/new)',
    },
    servers: [
      {
        description: 'Dev server',
        url: 'http://localhost:5000',
      },
      {
        description: 'Prod server',
        url: 'https://kenyacounty.herokuapp.com',
      },
    ],
  },
  apis: ['./components/*/*.js'],
};

const customProps = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const specs = swaggerJSDoc(options);
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

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(specs, customProps));
app.use('/api/v1/province', province);
app.use('/api/v1/county', county);
app.use('/api/v1/constituency', constituency);
app.use('/api/v1/ward', ward);

app.get('/', (req, res) => {
  res.redirect('/api/docs');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(chalk.magenta.bold(`Server is listening on port ${PORT}`))
);

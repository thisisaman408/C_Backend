import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import predictRoute from './src/routes/predict';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/predict', predictRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import cors from 'cors';
import express from 'express';
import predictRoute from './src/routes/predict';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'https://c-ui.vercel.app/',
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json()); 

app.use('/predict', predictRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
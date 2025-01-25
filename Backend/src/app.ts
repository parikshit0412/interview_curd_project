import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectToDB} from '../db/db';
import userRouter from '../routes/user.routes';
import productRouter from '../routes/product.routes';
import path from 'path';
import fs from 'fs';

dotenv.config();
const app = express();
const port = 8200;
app.use(cors(
  {
    origin: 'http://localhost:5173', // Allow requests from localhost:5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies if needed
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (_req, res) => {
  res.send('Hello World!');
});
app.use('/uploads', express.static('uploads', {
  fallthrough: false,
}));
console.log('Static files should be served from /uploads path.');
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(port, async () => {
  try {
    await connectToDB();
    console.log(`Express was listening at http://localhost:${port}`);
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  }
});

export default app;
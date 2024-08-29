import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config({path:'.env'}); 

import AppDataSource from './config/dataSource';
import app from './app';

AppDataSource.initialize().then(() => {
  console.log('Database Connected');
}).catch((err) => {
  console.log('Some error occured while connencting with database',err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

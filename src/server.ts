import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
dotenv.config({path:".env"}); 
import AppDataSource from './config/data-source';

AppDataSource.initialize().then(() => {
  console.log("Database Connected");
}).catch((err) => {
  console.log("Some error occured while connencting with database",err);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


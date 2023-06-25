import express, { Request, Response,Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './db';
import User from './models/User';
import { swaggerSpec } from './swagger';
import config from './config';
import userRoutes from './routes/userRoutes';

config(); 
const app: Express = express();
const port = process.env.PORT || 6500;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://food-app-backend-vevc.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/api/v1/user', userRoutes);

connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
  });
}).catch(err=>{
  console.log(err)
});



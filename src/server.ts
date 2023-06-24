import express, { Request, Response,Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './db';
import User from './models/User';
import { swaggerSpec } from './swagger';


const app: Express = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
  });
}).catch(err=>{
  console.log(err)
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Create a new user and save it to the database
 *     description: Creates a new user with random name and email, and saves it to the database.
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Failed to save user
 */
app.get('/test', (req: Request, res: Response) => {
  const newUser = new User({
    name: 'John Doe'+Math.floor(Math.random()*100000),
    email: 'johndoe@example.com',
    age: 25,
  });
  
  newUser.save()
  .then((savedUser: any) => {
    console.log('User saved successfully:', savedUser);
    res.send("user created")
  })
  .catch((error: any) => {
    console.error('Failed to save user:', error);
    res.send(JSON.stringify(error))
  });
  
}); 



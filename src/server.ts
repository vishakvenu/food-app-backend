import express, { Request, Response,Express } from 'express';
import connectDB from './db';
import User from './models/User';


const app: Express = express();
const port = process.env.PORT || 4000;
app.use(express.json());

connectDB().then(()=>{
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);   
  });
}).catch(err=>{
  console.log(err)
});

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



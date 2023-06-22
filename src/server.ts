import express, { Request, Response,Express } from 'express';


const app: Express = express();
const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express!');
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);  
});

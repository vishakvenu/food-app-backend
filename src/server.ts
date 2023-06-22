import express, { Request, Response,Express } from 'express';


const app: Express = express();
const port = process.env.PORT || 4000;

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello, Express testing! ok vishak we will see you later');
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);  
});

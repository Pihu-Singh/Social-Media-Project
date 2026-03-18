import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';
<<<<<<< HEAD
=======
import { clerkMiddleware } from '@clerk/express';
import userRouter from './routes/userRoutes.js';
>>>>>>> 4c483ab (Initial commit)

const app = express();

await connectDB();

app.use(express.json());
app.use(cors());
<<<<<<< HEAD
=======
app.use(clerkMiddleware());
>>>>>>> 4c483ab (Initial commit)

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/inngest', serve({ client: inngest, functions }));
<<<<<<< HEAD
=======
app.use('/api/user', userRouter);
>>>>>>> 4c483ab (Initial commit)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

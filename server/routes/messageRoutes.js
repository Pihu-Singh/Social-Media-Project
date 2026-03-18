import express from 'express';
import {
  getChatMessages,
  sendMessage,
  sseController,
<<<<<<< HEAD
} from '../controllers/messageController.js';
=======
} from '../controllers/messageController';
>>>>>>> a2ad62028278bf67f321407f62bb8034a405806b
import { upload } from '../configs/multer.js';
import { protect } from '../middlewares/auth.js';

const messageRouter = express.Router();

messageRouter.get('/:userId', sseController);
messageRouter.post('/send', upload.single('image'), protect, sendMessage);
messageRouter.post('/get', protect, getChatMessages);

export default messageRouter;

import express from 'express';
import cors from 'cors';
import { PORT } from './config';
import userRouter from './domain/user/user-routes';
import productRouter from './domain/product/product-routes';
import orderRouter from './domain/order/order-routes';
import logger from './utils/logger';
import requestLoggerMiddleware from './middleware/request-logger';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middleware/error';
import { authMiddleware } from './middleware/auth';

const app = express();
app.use(cors({
    origin: [
      'http://localhost:4200',
      'https://webshop-vert-three.vercel.app'  // Your frontend URL
    ],
    credentials: true
  }));
app.use(requestLoggerMiddleware);
app.use(errorMiddleware);
app.use(authMiddleware);

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
export default app;
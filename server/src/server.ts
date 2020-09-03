import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// morgan은 대표적인 로깅 미들웨어이며 HTTP메서드로 특정 URL을 방문할 때만 함수가 호출됨.
// req와 res를 깔끔하게 포멧 해주는 모듈
import morgan from 'morgan';

// 보안 모듈
// HTTP 헤더의 설정 변경을 통해 위험한 웹 취약점으로부터 서버를 보호해준다.
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger, { LoggerStream } from '@config/logger';

import { parserLimit } from '@config/constants';

// Init express
const app = express();

/************************************************************************************
 *                                 기본 express 세팅
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 개발모드시 불려지는 route를 보여준다.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev', { stream: new LoggerStream() }));
}

// 보안
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// body-parser
app.use(bodyParser.json({ limit: parserLimit }));
app.use(bodyParser.urlencoded({ extended: true }));

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

// Export express instance
export default app;

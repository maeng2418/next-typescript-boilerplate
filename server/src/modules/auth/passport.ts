// import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import logger from '@config/logger';
import { Request } from 'express';
import { jwtSecret } from '@config/constants';

const jwtFromRequest = (req: Request) => {
  let token: string | null = null;
  if (req && req.headers.authorization) {
    token = req.headers.authorization;
  }
  return token;
};
const secretOrKey = jwtSecret;
const opts = { jwtFromRequest, secretOrKey };

// JWT 토큰을 읽어 해당 사용자를 인증합니다.
const jwt = new JwtStrategy(opts, (jwtPayload, done) => {
  logger.info('JWT BASED AUTH GETTING CALLED');
  if (jwtPayload.data) {
    // check user valid
    return done(null, jwtPayload.data);
  } else {
    return done(null, false);
  }
});

/*
  세션 이용하여 구현
  serializeUser 메서드를 이용하여 인증 성공시, 사용자 정보를 Session에 저장할 수 있다.
  deserializeUser 메서드를 이용하여 인증 후, 페이지 접근시 마다 사용자 정보를 Session에서 읽어옴.
*/

// passport.serializeUser((user, done) => {
//   logger.debug('serializeUser');
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   logger.debug('deserializeUser');
//   done(null, obj);
// });

export default { jwt };

import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK, ACCEPTED } from 'http-status-codes';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { jwtSecret, tokenExpire } from '@config/constants';
import { UserService } from '@services';
import REGEX from '@shared/validate';
import CustomError from '@modules/exceptions/custom-error';

interface IToken {
  id: number;
  username: string;
  email: string;
}

// 회원가입
const emailSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } = req;

  try {
    // 유효성 검사
    if (!REGEX.PW_REGEX.test(body.password))
      throw new CustomError(
        BAD_REQUEST,
        'Validation Error: Password',
        'Validation Error: Password'
      );

    // 이미 존재하는지 여부 파악
    const existUser = await UserService.findUserByEmail(body.email);

    if (existUser) {
      throw new CustomError(BAD_REQUEST, `already exists email ${body.email}`, '');
    } else {
      // 유저 데이터 생성
      const emailUserData = {
        username: body.username,
        email: body.email,
        password: crypto.createHash('sha256').update(body.password).digest('base64'),
        provider: 'email',
      };
      // 유저 생성
      const response = await UserService.createUser(emailUserData);
      const user = response[0];
      const isCreated = response[1];

      console.info(`user ${isCreated ? 'created' : 'found'}: ${user.id}`);

      // 토큰 생성
      const token = jwt.sign(
        {
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        },
        jwtSecret,
        { expiresIn: tokenExpire }
      );

      // 쿠키로 토큰 저장
      res
        .cookie('authorization', token, {
          // 2 시간 뒤 만료
          expires: new Date(Date.now() + 120 * 60 * 1000),
        })
        .status(CREATED)
        .json({
          status: CREATED,
          message: `created user success email(${body.email})`,
          result: {
            token: token,
            expires: new Date(Date.now() + 120 * 60 * 1000),
          },
        });
    }
  } catch (err) {
    next(err);
  }
};

// 로그인
const emailSignIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } = req;
  try {
    // 유저 찾기
    const emailUser = await UserService.findUserByEmail(body.email);
    if (!emailUser) throw new CustomError(ACCEPTED, `no email user with ${body.email}`, '');
    if (emailUser.password !== crypto.createHash('sha256').update(body.password).digest('base64'))
      throw new CustomError(ACCEPTED, 'not matched password', '');

    // 토큰 생성
    const token = jwt.sign(
      {
        data: {
          id: emailUser.getDataValue('id'),
          username: emailUser.getDataValue('username'),
          email: emailUser.email,
        } as IToken,
      },
      jwtSecret,
      { expiresIn: tokenExpire }
    );

    // 토큰을 쿠키에 저장
    res
      .cookie('authorization', token, {
        // 2 시간 뒤 만료
        expires: new Date(Date.now() + 120 * 60 * 1000),
      })
      .status(OK)
      .json({
        status: OK,
        message: `Log in success ${body.email}`,
        result: {
          token: token,
          expires: new Date(Date.now() + 120 * 60 * 1000),
        },
      });
  } catch (err) {
    next(err);
  }
};

// 토큰 검사
const isValidToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = req.user as IToken;
  try {
    if (user) {
      res
        .status(OK)
        .json({ status: OK, message: `valificated user ${user.username}`, result: user });
    } else throw new CustomError(BAD_REQUEST, 'not valid token', '');
  } catch (err) {
    next(err);
  }
};

export default {
  emailSignUp,
  emailSignIn,
  isValidToken,
};

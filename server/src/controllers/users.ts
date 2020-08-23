import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { paramMissingError } from '@config/constants';
import { UserService } from '../services';

const findAll = async (req: Request, res: Response) => {
    try {
        const users = await UserService.findAll();
        return res.status(OK).json({users});
    } catch (err) {
			return res.status(BAD_REQUEST).json({
				error: err
			});
    }
  };

const create = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    await UserService.create(body);
    return res.status(CREATED).end();
  } catch (err) {
		return res.status(BAD_REQUEST).json({
			error: err
		});
  }
};

const update = async (req: Request, res: Response) => {
  const { body, params } = req;
  const paramId = parseInt(params.id);

  try {
    if (!paramId) {
			throw Error(paramMissingError);
    }
    await UserService.update(paramId, body);
    return res.status(OK).end();
  } catch (err) {
		return res.status(BAD_REQUEST).json({
			error: err
		});
  }
};

const remove = async (req: Request, res: Response) => {
    const { params } = req;
		const paramId = parseInt(params.id);
  
    try {
			if (!paramId) {
				throw Error(paramMissingError);
			}
      const user = await UserService.remove(paramId);
			return res.status(OK).end();
    } catch (err) {
      return res.status(BAD_REQUEST).json({
        error: err
      });
    }
  };

export default {
  create,
  findAll,
  update,
  remove
};

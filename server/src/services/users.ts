import { User } from '@models';

interface IBody {
  id: string;
  password: string;
}

const findAll = async (): Promise<User[]> => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    throw Error(err);
  }
};

const create = async (body: IBody): Promise<void> => {
  try {
    await User.create(body);
  } catch (err) {
    throw Error(err);
  }
};

const update = async (id: number, body: IBody): Promise<void> => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw Error(`no category with id ${id}`);
    user.update(body);
  } catch (err) {
    throw Error(err);
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    await User.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    throw Error(err);
  }
};

export default {
  findAll,
  create,
  update,
  remove,
};

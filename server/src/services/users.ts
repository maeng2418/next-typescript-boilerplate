import { User } from '../models';

type Body = {
    id: string
    password: string
}

const findAll = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch(err) {
        throw Error(err)
    }
};

const create = async (body:Body) => {
    try {
        await User.create(body);
      } catch (err) {
        throw Error(err)
      }
};


const update = async(id:number, body:Body) => {
    try {
        const user = await User.findByPk(id);
        if (!user)
          throw Error(`no category with id ${id}`);
        user.update(body);    
      } catch (err) {
        throw Error(err);
      }
}

const remove = async(id:number) => {
    try {
      await User.destroy({
        where: {
          id,
        }
      })
    } catch (err) {
        throw Error(err);
    }
}

export default {
  findAll,
  create,
  update,
  remove,
};

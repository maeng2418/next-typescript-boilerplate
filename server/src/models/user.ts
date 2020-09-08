import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@database';
import REGEX from '@shared/validate';

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string; // 미리 선언하고 할당안되어도 나중에 반드시 할당될 것을 암시.
  public password?: string; // 자동으로 | undefined를 포함
  public provider!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        is: REGEX.EMAIL_REGEX,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  { timestamps: true, tableName: 'user', sequelize }
);

// User.hasMany(Cart, {
//   sourceKey: 'id',
//   foreignKey: { name: 'userId', allowNull: false },
//   as: 'carts',
// });

export default User;

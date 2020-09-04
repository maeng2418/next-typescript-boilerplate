import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@database';

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
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
